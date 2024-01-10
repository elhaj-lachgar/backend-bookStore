const BookModule = require("../module/BookModule");
const {
  CreateElement,
  DeleteElement,
  GetElementById,
  UpdateElement,
  GetElements
} = require("./FactoryHandler");

const asynchandler =  require('express-async-handler')



exports.CreateBookService = CreateElement(BookModule);

exports.UpdateBookService = UpdateElement(BookModule);

exports.GetBookService = GetElementById(BookModule);

exports.DeleteBookService = DeleteElement(BookModule);

exports.GetBooksService = GetElements(BookModule);

exports.GetAdminService = asynchandler( async ( req , res , next ) => {
  const books  = await BookModule.find({});
  return res.status(200).json({data:books});
})