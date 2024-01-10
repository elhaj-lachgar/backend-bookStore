const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    codePostal: Number,
    city: String,
    streat: String,
    country : String,
  },
  { timestamps: true }
);

const AddressModule = mongoose.model("address" , AddressSchema);

module.exports = AddressModule;


