import { Request, Response } from "express";
import { CreateCategoryService } from "../services/CreateCategoryService";

export class CategoryController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createCategoryService = new CreateCategoryService();

    try {
      const category = await createCategoryService.execute(name);

      return res.json(category);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }
}
