import { Request, Response } from "express";
import { ListProductsService } from "../services/ListProductsService";
import { ReadCsvService } from "../services/ReadCsvService";

export class ProductController {
  async createFile(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const readCsvService = new ReadCsvService();

    const products = await readCsvService.execute(file?.buffer);

    return res.json(products);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const listProductsService = new ListProductsService();

    const products = await listProductsService.execute();

    return res.json(products);
  }
}
