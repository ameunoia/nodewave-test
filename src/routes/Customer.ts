import { upload } from "$middlewares/multerMiddleware";
import { Router } from "express";
import * as CustomerController from "$controllers/rest/CustomerController";
import { authMiddleware } from "$middlewares/authMiddleware";

const CustomerRoutes = Router({ mergeParams: true });

CustomerRoutes.use(authMiddleware);
CustomerRoutes.post(
  "/import",
  upload.single("file"),
  CustomerController.uploadCustomerData
);

export default CustomerRoutes;
