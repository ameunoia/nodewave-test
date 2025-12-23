import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE } from "$entities/Service";
import Logger from "$pkg/logger";
import { uploadExcel } from "./UploadService";

export async function importCustomer(excelFile: Express.Multer.File) {
  try {
    let excelUrl: string | undefined;

    const uploadResult = await uploadExcel(excelFile);
    excelUrl = uploadResult.url;

    return {
      status: true,
      data: {
        url: excelUrl,
      },
    };
  } catch (error) {
    Logger.error(`AuthService.post : ${error}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
