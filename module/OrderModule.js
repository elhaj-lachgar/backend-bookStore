const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    },
    cardItems: [
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
    isDelaivered: {
      type: Boolean,
      default: false,
    },
    DelaiveredAt: Date,
    address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
      required: [true, "address is required"],
    },
  },
  { timestamps: true }
);


const OrderModule = mongoose.model("order", OrderSchema);

module.exports = OrderModule;
