import { client } from "../database/client";

export class CategoriesRepository {
  async create(name: string) {
    const category = await client.categories.create({
      data: { name },
    });

    return category;
  }

  async findByName(name: string) {
    const category = await client.categories.findFirst({
      where: {
        name,
      },
    });

    return category;
  }
}
