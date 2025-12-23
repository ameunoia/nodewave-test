import { Router } from "express";
import * as AuthController from "$controllers/rest/AuthController";

const AuthRoutes = Router({ mergeParams: true });

AuthRoutes.post("/register", AuthController.registerUser);
AuthRoutes.post("/login", AuthController.loginUser);

export default AuthRoutes;
