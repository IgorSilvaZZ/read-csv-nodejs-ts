import { Readable } from "stream";
import readline from "readline";

import { ProductsRepository } from "../repositories/ProductsRepository";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IProduct {
  code_bar: string;
  description: string;
  price: number;
  quantity: number;
  categoriesId: string;
}

export class ReadCsvService {
  async execute(file?: Buffer) {
    const categoriesRepository = new CategoriesRepository();
    const productRepository = new ProductsRepository();

    // Permitir que o arquivo seja lido sem estar na maquina onde o server esta!
    const readableFile = new Readable();
    readableFile.push(file);
    readableFile.push(null);

    // Ler o arquivo linha a linha do arquivo que foi lido.
    // É preciso criar uma interface para passarmos o conteudo que precisa ser lido de fato.
    const productsLine = readline.createInterface({
      input: readableFile,
    });

    const products: IProduct[] = [];

    for await (let line of productsLine) {
      // Para cada linha crie um array pra cada separador pela virgula
      const [code_bar, description, price, quantity, categoryName] =
        line.split(",");

      const category = await categoriesRepository.findByName(categoryName);

      if (category) {
        products.push({
          code_bar,
          description,
          price: Number(price),
          quantity: Number(quantity),
          categoriesId: category.id,
        });
      }
    }

    for await (let {
      code_bar,
      description,
      price,
      quantity,
      categoriesId,
    } of products) {
      const productExists = await productRepository.findByCodeBar(code_bar);

      if (!productExists) {
        await productRepository.create({
          code_bar,
          description,
          price,
          quantity,
          categoriesId,
        });
      }
    }

    return products;
  }
}
