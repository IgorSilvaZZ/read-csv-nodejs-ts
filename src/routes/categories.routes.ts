import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoriesRoutes = Router();

const categoryController = new CategoryController();

categoriesRoutes.post("/", categoryController.create);

export { categoriesRoutes };
