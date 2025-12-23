import { Request, Response } from "express";
import * as ExcelJobService from "$services/ExcelService";
import {
  handleServiceErrorWithResponse,
  response_success,
} from "$utils/response.utils";
export async function getProcessedExcel(req: Request, res: Response) {
  const jobId = req.params.id;

  const serviceResponse = await ExcelJobService.getExcelJobStatus(jobId);
  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(
    res,
    serviceResponse.data,
    "get excel job status successfully!"
  );
}
