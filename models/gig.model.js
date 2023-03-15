const mongoose = require("mongoose");

const GigSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },

    //TODO make it as a foreign key
    categoryId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    imgs: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
    isBought: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gig", GigSchema);
