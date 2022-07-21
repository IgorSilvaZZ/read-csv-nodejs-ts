import { Readable } from "stream";
import readline from "readline";

import { ProductsRepository } from "../repositories/ProductsRepository";

interface IProduct {
  code_bar: string;
  description: string;
  price: number;
  quantity: number;
}

export class ReadCsvService {
  async execute(file?: Buffer) {
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
      const [code_bar, description, price, quantity] = line.split(",");

      products.push({
        code_bar,
        description,
        price: Number(price),
        quantity: Number(quantity),
      });
    }

    for await (let { code_bar, description, price, quantity } of products) {
      const productExists = await productRepository.findByCodeBar(code_bar);

      if (!productExists) {
        await productRepository.create({
          code_bar,
          description,
          price,
          quantity,
        });
      }
    }

    return products;
  }
}
