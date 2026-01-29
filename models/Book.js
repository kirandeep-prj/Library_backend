const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },

    Author: {
      type: String,
      required: [true, "Author is required"],
      trim: true
    },
    Category: {
      type: String,
      required: [true, "Category  is required"],
      trim: true
    },


    Availablecopies: {
   type: Number,
    required: [true, "Available copies is required"],
    min: 0
},


    Borrowed: [
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    canEdit: { type: Boolean, default: false }
  }
],

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("books", BookSchema);
