const CategoryModule = require("../module/CategoryModule");

const {
  CreateElement,
  UpdateElement,
  GetElementById,
  DeleteElement,
  GetElements,
} = require("./FactoryHandler");

exports.CreateCategoryService = CreateElement(CategoryModule);

exports.UpdateCategoryService = UpdateElement(CategoryModule);

exports.GetCategoryService = GetElementById(CategoryModule);

exports.DeleteCategoryService = DeleteElement(CategoryModule);

exports.GetCategorysService = GetElements(CategoryModule);
