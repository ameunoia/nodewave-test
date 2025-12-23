import Logger from "$pkg/logger";
import { pickExcelJob, runExcelJob } from "$services/ExcelService";

export function startExcelJobWorker() {
  Logger.info("ExcelJobWorker started");

  setInterval(async () => {
    try {
      const job = await pickExcelJob();
      if (!job) return;

      await runExcelJob(job);
    } catch (err) {
      Logger.error({
        message: "ExcelJobWorker failed",
        error: err,
      });
    }
  }, 3000);
}
