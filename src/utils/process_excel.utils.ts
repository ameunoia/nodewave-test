import { ExcelJob } from "@prisma/client";
import XLSX from "xlsx";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "./r2Storage";

export async function processExcel(job: ExcelJob) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: job.fileKey,
  });

  const signedUrl = await getSignedUrl(r2, command, {
    expiresIn: 900, // 15 minutes
  });

  const response = await fetch(signedUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch excel file");
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) throw new Error("Excel sheet not found");

  const rows = XLSX.utils.sheet_to_json<any>(sheet);

  return rows.map((row, index) => ({
    name: String(row.name || "").trim(),
    email: String(row.email || "").trim(),
    phone: String(row.phone || "").trim(),
  }));
}
