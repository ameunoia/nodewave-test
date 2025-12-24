import {
  handleServiceErrorWithResponse,
  response_bad_request,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";
import * as CustomerService from "$services/CustomerService";
import { FilteringQueryV2 } from "$entities/Query";
import { parseJsonQuery } from "$utils/parse_json.utils";

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

export async function getCustomers(req: Request, res: Response) {
  const filters: FilteringQueryV2 = {
    page: req.query.page ? Number(req.query.page) : undefined,
    rows: req.query.rows ? Number(req.query.rows) : undefined,
    orderKey: req.query.orderKey as string,
    orderRule: req.query.orderRule as any,

    filters: parseJsonQuery(req.query.filters),
    searchFilters: parseJsonQuery(req.query.searchFilters),
    rangedFilters: parseJsonQuery(req.query.rangedFilters),
  };

  const serviceResponse = await CustomerService.getCustomers(filters);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(
    res,
    serviceResponse.data,
    "Customers fetched successfully!"
  );
}
