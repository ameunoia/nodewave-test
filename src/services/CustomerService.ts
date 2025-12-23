import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE } from "$entities/Service";
import Logger from "$pkg/logger";
import { uploadAndProcessExcel } from "./ExcelService";

export async function importCustomer(excelFile: Express.Multer.File) {
  try {
    const processExcel = await uploadAndProcessExcel(excelFile);

    return processExcel;
  } catch (error) {
    Logger.error(`CustomerService.post : ${error}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
