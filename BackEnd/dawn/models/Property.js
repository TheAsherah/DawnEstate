const mongoose = require("mongoose");

// Property schema
const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["villa", "house", "apartment", "studio", "land"],
      default: "villa",
    },
    prestation: {
      type: String,
      required: true,
      enum: ["sale", "rent"],
      default: "sale",
    },
    city: {
      type: String,
      required: true,
      trim: true,
      default: "Marrakech",
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    surface: {
      type: Number,
      required: false,
    },
    bedrooms: {
      type: Number,
      required: false,
    },
    bathrooms: {
      type: Number,
      required: false,
    },
    pool: {
      type: String,
      enum: ["yes", "no"],
      default: "yes",
    },
    metaTitle: {
      type: String,
      required: false,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: false,
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    mainImage: {
      type: Object,
      default: { url: "", publicId: null },
    },
    gallery: {
      type: [Object],
      default: [],
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Property model
const Property = mongoose.model("Property", PropertySchema);

module.exports = {
  Property,
};