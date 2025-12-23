import { Request, Response } from "express";
import * as AuthService from "$services/AuthService";
import {
  handleServiceErrorWithResponse,
  response_bad_request,
  response_success,
} from "$utils/response.utils";

export async function registerUser(req: Request, res: Response) {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return response_bad_request(res, "Email and password are required");
  }

  const serviceResponse = await AuthService.registerUser(email, password, name);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(
    res,
    serviceResponse.data,
    "User registered successfully!"
  );
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return response_bad_request(res, "Email and password are required");
  }

  const serviceResponse = await AuthService.loginUser(email, password);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(
    res,
    serviceResponse.data,
    "User logged in successfully!"
  );
}
