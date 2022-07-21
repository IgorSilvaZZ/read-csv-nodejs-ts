import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { ProductsRepository } from "../repositories/ProductsRepository";

export class CreateProductService {
  async execute({ code_bar, description, price, quantity }: ICreateProductDTO) {
    const productsRepository = new ProductsRepository();

    const productExists = await productsRepository.findByCodeBar(code_bar);

    if (productExists) {
      throw new Error("Product already exists!");
    }

    const category = await productsRepository.create({
      code_bar,
      description,
      price,
      quantity,
    });

    return category;
  }
}
