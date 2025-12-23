import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE } from "$entities/Service";
import Logger from "$pkg/logger";
import { prisma } from "$utils/prisma.utils";
import { ExcelJob, Status } from "@prisma/client";
import { uploadExcel } from "./UploadService";
import { processExcel } from "$utils/process_excel.utils";

export async function uploadAndProcessExcel(excelFile: Express.Multer.File) {
  try {
    const uploadResult = await uploadExcel(excelFile);

    const job = await prisma.excelJob.create({
      data: {
        fileKey: uploadResult.key,
        status: "PENDING",
      },
    });

    return {
      status: true,
      data: {
        jobId: job.id,
      },
    };
  } catch (error) {
    Logger.error(`ExcelService : ${error}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

export async function pickExcelJob() {
  const job = await prisma.excelJob.findFirst({
    where: {
      status: Status.PENDING,
      OR: [
        { lockedAt: null },
        { lockedAt: { lt: new Date(Date.now() - 5 * 60 * 1000) } }, // 5 menit timeout
      ],
      attempt: { lt: prisma.excelJob.fields.maxAttempts },
    },
    orderBy: { createdAt: "asc" },
  });
  return job;
}

export async function runExcelJob(job: ExcelJob) {
  await prisma.excelJob.update({
    where: { id: job.id },
    data: {
      status: Status.IN_PROGRESS,
      lockedAt: new Date(),
      attempt: { increment: 1 },
    },
  });

  try {
    const rows = await processExcel(job);

    await prisma.customer.createMany({
      data: rows,
      skipDuplicates: true,
    });

    await prisma.excelJob.update({
      where: { id: job.id },
      data: {
        status: Status.COMPLETED,
        lockedAt: null,
      },
    });
  } catch (err: any) {
    const failedPermanently = job.attempt + 1 >= job.maxAttempts;

    await prisma.excelJob.update({
      where: { id: job.id },
      data: {
        status: failedPermanently ? Status.FAILED : Status.PENDING,
        lockedAt: null,
      },
    });
  }
}
