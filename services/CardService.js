const asynchandler = require("express-async-handler");
const ErrorForm = require("../utils/ErrorForm");
const CartModule = require("../module/CartModule");
const BookModule = require("../module/BookModule");
const UserModule = require("../module/UserModule");

// per user
// create a new Cart
// url api/v1/cart
exports.CreateCardService = asynchandler(async (req, res, next) => {
  const card = await CartModule.findOne({ userId: req.user._id });
  if (card) {
    card.Books.splice(0,card.Books.length);
  }

  const new_card = await CartModule.create({
    userId: req.user._id,
    Books: req.body.books,
  });

  const user = await UserModule.findOne({ _id: req.user._id });

  user.card = new_card._id.toJSON();

  await user.save();

  let TotalPrice = 0;
  new_card.Books.forEach((book) => {
    TotalPrice += book.price.value * book.quantity;
  });

  new_card.TotalPrice = TotalPrice;

  await new_card.save();

  return res.status(201).json({ data: new_card });
});

// per user
// update quantity of book
// url api/v1/cart
exports.UpdateCardService = asynchandler(async (req, res, next) => {
  const card = await CartModule.findOne({ userId: req.user._id });
  if (!card) return next(new ErrorForm("card not found", 404));

  const index = card.Books.findIndex((ele) => {
    return ele.book == req.body.bookId;
  });

  if (index <= -1) return next(new ErrorForm("book not found in cart", 404));

  const preQuantity = card.Books[index].quantity;

  card.Books[index].quantity = req.body.quantity || 1;

  card.TotalPrice +=
    card.Books[index].quantity * card.Books[index].price.value -
    preQuantity * card.Books[index].price.value;

  await card.save();

  return res.status(200).json({ data: card });
});

// per user
// add element to card
// url api/v1/cart
exports.AddElementToCardService = asynchandler(async (req, res, next) => {
  const card = await CartModule.findOne({ userId: req.user._id });

  if (!card) return next(new ErrorForm("card not found", 404));

  const Book = await BookModule.findOne({ _id: req.body.bookId });

  if (!Book) return next(new ErrorForm("book not found", 404));

  const index = card.Books.findIndex((ele) => {
    return ele.book.toString() === Book._id.toString();
  });

  if (index <= -1) {
    card.Books.push({
      book: Book._id,
      price: Book.price,
      quantity: req.body.quantity,
    });
    console.log(Book.price.value * 1);
    card.TotalPrice += Book.price.value * (req.body.quantity || 1);
  } else {
    card.Books[index].quantity += 1;
    card.TotalPrice += card.Books[index].price.value;
  }

  await card.save();

  return res.status(200).json({ data: card });
});

// per user
// delete element from card
// url api/v1/card
exports.DeleteElmentFromCardService = asynchandler(async (req, res, next) => {
  const card = await CartModule.findOne({ userId: req.user._id });
  if (!card) return next(new ErrorForm("card not found", 404));

  const index = card.Books.findIndex((ele) => {
    return ele.book.toString() === req.body.bookId;
  });

  if (index <= -1) return next(new ErrorForm(" book not found", 404));

  const preQuantity = card.Books[index].quantity;
  const prePrice = card.Books[index].price.value;
  card.Books.splice(index, 1);

  card.TotalPrice -= preQuantity * prePrice;

  await card.save();

  return res.status(200).json({ data: card });
});

// per user
// clear card
// url api/v1/card
exports.ClearCardService = asynchandler(async (req, res, next) => {
  const card = await CartModule.findOne({ _id: req.user._id });
  if (!card) return next(new ErrorForm("Couldn't find card", 404));
  await card.deleteOne();
  return res.status(203).json({ message: "Card deleted successfully" });
});



exports.IncrementQuantity = asynchandler(async (req, res, next) => {
  const card = await CartModule.findOne({ userId: req.user._id });
  if (!card) return next(new ErrorForm("card not found", 404));
  const index = card.Books.findIndex(
    (ele) => ele.book.toString() == req.body.bookId
  );
  if (index <= -1) return next(new ErrorForm("book id not found in cart", 404));
  card.Books[index].quantity += 1;
  card.TotalPrice += card.Books[index].price.value;
  await card.save();
  return res.status(200).json({data:card});
});


exports.DecrementQuantity = asynchandler ( async ( req, res, next ) => {
  const card = await CartModule.findOne({ userId: req.user._id });
  if (!card) return next(new ErrorForm("card not found", 404));
  const index = card.Books.findIndex(
    (ele) => ele.book.toString() == req.body.bookId
  );
  if (index <= -1) return next(new ErrorForm("book id not found in cart", 404));
  card.Books[index].quantity -= 1;
  card.TotalPrice -= card.Books[index].price.value;
  await card.save();
  return res.status(200).json({data:card});
});