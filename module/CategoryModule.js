const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required "],
      unique: [true, "category  name must be unique"],
    },
    image: String,
  },
  { timestamps: true }
);

const CategoryModule = mongoose.model("category", CategorySchema);



module.exports = CategoryModule;
