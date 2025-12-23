import {
  handleServiceErrorWithResponse,
  response_bad_request,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";
import * as CustomerService from "$services/CustomerService";

export async function uploadCustomerData(req: Request, res: Response) {
  const file = req.file;

  if (!file) {
    return response_bad_request(res, "No file uploaded");
  }

  const serviceResponse = await CustomerService.importCustomer(file);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(
    res,
    serviceResponse.data,
    "Customer data imported successfully!"
  );
}
