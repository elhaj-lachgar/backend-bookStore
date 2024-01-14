const ReviewModule = require("../module/ReviewModule");
const asynchandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorForm");
const BookModule = require("../module/BookModule");
const UserModule = require("../module/UserModule");

exports.CreateReviewService = asynchandler(async (req, res, next) => {
  const valid = req.user.books?.includes(req.body.bookId);
  if (!valid)
    return next(
      new ErrorHandler("user has not access to create review in this book", 404)
    );

  // create review
  const review = await ReviewModule.create({
    book: req.body.bookId,
    content: req.body.content,
    user: req.user._id,
    rating: req.body.rating,
  });

  //handle user updates
  const user = await UserModule.findOne({ _id: req.user._id });
  user.reviews.push(review._id);
  await user.save();

  //handle book updates
  const book = await BookModule.findOne({ _id: req.body.bookId });

  book.reviews.push(review._id);

  book.rating += req.body.rating / book.count_rating;

  book.count_rating += 1;

  await book.save();

  return res.status(200).json({ data: review });
});

exports.UpdateReviewService = asynchandler(async (req, res, next) => {
  const user = await UserModule.findOne({ _id: req.user._id });

  const valid = user.reviews.includes(req.params.id);

  if (!valid) return next(new ErrorHandler("review not found", 404));

  const review = await ReviewModule.findOne({ _id: req.params.id });

  if (req.body?.rating) {
    const book = await BookModule.findOne({ _id: review.book });
    book.rating += (req.body?.rating - review.rating) / book.count_rating;
    await book.save();
    review.rating = req.body.rating;
  }
  if (req.body?.content) {
    review.content = req.body.content;
  }

  await review.save();

  return res.status(200).json({ data: review });
});

exports.DeleteReviewService = asynchandler(async (req, res, next) => {
  const user = await UserModule.findOne({ _id: req.user._id });

  const index = user.reviews.findIndex(
    (review) => req.params.id == review.toString()
  );

  if (index <= -1) return next(new ErrorHandler("review not found", 404));

  const review = await ReviewModule.findOne({ _id: req.params.id });

  // update  book
  const book = await BookModule.findOne({ _id: review.book });

  const i = book.reviews.findIndex( ele => ele.toString() == req.params.id );

  book.reviews.splice(i,1);

  book.rating = book.count_rating * book.rating - review.rating;

  book.count_rating -= 1;

  // update user
  user.reviews.splice(index, 1);

  //save changes
  await user.save();
  await book.save();
  await review.deleteOne();

  return res
    .status(203)
    .json({ success: true, message: "Review successfully deleted" });
});
