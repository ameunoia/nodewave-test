import { Request, Response } from "express";
import * as AuthService from "$services/AuthService";
import {
  handleServiceErrorWithResponse,
  response_bad_request,
  response_success,
} from "$utils/response.utils";
import { UserLoginDTO, UserRegisterDTO } from "$entities/Auth";

export async function registerUser(req: Request, res: Response) {
  const body = req.body as UserRegisterDTO;

  if (!body.email || !body.password) {
    return response_bad_request(res, "Email and password are required");
  }

  const serviceResponse = await AuthService.registerUser(
    body.email,
    body.password,
    body.name
  );

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
  const body = req.body as UserLoginDTO;

  if (!body.email || !body.password) {
    return response_bad_request(res, "Email and password are required");
  }

  const serviceResponse = await AuthService.loginUser(
    body.email,
    body.password
  );

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(
    res,
    serviceResponse.data,
    "User logged in successfully!"
  );
}
