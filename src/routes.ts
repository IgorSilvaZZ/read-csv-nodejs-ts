import { Router } from "express";

import multer from "multer";

import { ProductController } from "./controllers/ProductController";

const multerConfig = multer();

const routes = Router();

routes.post(
  "/products",
  multerConfig.single("file"),
  new ProductController().create
);

export { routes };
