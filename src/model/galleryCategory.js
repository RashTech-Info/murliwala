const mongoose = require("mongoose");

const galleryCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
  },
});

const galleryCategoryModel = mongoose.model(
  "galleryCategory",
  galleryCategorySchema
);
module.exports = galleryCategoryModel;
