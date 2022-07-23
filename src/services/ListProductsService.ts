import { ProductsRepository } from "../repositories/ProductsRepository";

export class ListProductsService {
  async execute() {
    const productRepository = new ProductsRepository();

    const products = await productRepository.list();

    return products;
  }
}
