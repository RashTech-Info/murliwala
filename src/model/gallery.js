const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  location: { type: String },
  video: { type: String },
  image: [String],
});

const galleryModel = mongoose.model("gallery", gallerySchema);
module.exports = galleryModel;
