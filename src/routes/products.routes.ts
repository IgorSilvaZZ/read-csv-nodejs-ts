import { Router } from "express";

import multer from "multer";

import { ProductController } from "../controllers/ProductController";

const multerConfig = multer();

const productsRoutes = Router();

const productController = new ProductController();

productsRoutes.get("/", productController.list);

productsRoutes.post(
  "/file",
  multerConfig.single("file"),
  productController.createFile
);

export { productsRoutes };
