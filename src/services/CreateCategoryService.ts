import { CategoriesRepository } from "../repositories/CategoriesRepository";

export class CreateCategoryService {
  async execute(name: string) {
    const categoriesRepository = new CategoriesRepository();

    const categoryAlreadyExists = await categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    const category = await categoriesRepository.create(name);

    return category;
  }
}
