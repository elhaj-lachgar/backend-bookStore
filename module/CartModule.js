const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    Books: [
      {
        book: {
          type: mongoose.Schema.ObjectId,
          ref: "book",
        },
        price: {
          currency: {
            type: String,
            enum: ["USD", "EUR", "USD"],
            default: "USD",
          },
          value: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    TotalPrice: Number,
  },
  { timestamps: true }
);

const CartModule = mongoose.model("cart", CartSchema);

module.exports = CartModule;
