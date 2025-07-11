const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  email: { type: String },
  eventType: { type: String },
  guestCount: { type: Number },
  eventDate: { type: String },
  budgetRange: { type: String },
  eventLocation: { type: String },
  description: { type: String },
  status: { type: String ,
    default:"New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const inquiryModel = mongoose.model("inquiry", inquirySchema);
module.exports = inquiryModel;
