import { authMiddleware } from "$middlewares/authMiddleware";
import { Router } from "express";
import * as ExcelJobController from "$controllers/rest/ExcelJobController";
const ExcelJobRoutes = Router({ mergeParams: true });

ExcelJobRoutes.use(authMiddleware);
ExcelJobRoutes.get("/status/:id", ExcelJobController.getProcessedExcel);

export default ExcelJobRoutes;
