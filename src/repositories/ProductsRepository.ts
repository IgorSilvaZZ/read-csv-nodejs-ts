import { client } from "../database/client";

import { ICreateProductDTO } from "../dtos/ICreateProductDTO";

export class ProductsRepository {
  async create({
    code_bar,
    description,
    price,
    quantity,
    categoriesId,
  }: ICreateProductDTO) {
    const product = await client.products.create({
      data: {
        code_bar,
        description,
        price,
        quantity,
        categoriesId,
      },
    });

    return product;
  }

  async findByCodeBar(code_bar: string) {
    const product = await client.products.findFirst({
      where: {
        code_bar,
      },
    });

    return product;
  }

  async list() {
    const products = await client.products.findMany({
      include: {
        Categories: true,
      },
    });

    return products;
  }
}
