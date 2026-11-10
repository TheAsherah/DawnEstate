const mongoose = require("mongoose");

// Blog schema
const BlogSchema = new mongoose.Schema(
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
    galleryImages: {
      type: [
        {
          url: { type: String, required: true },
          publicId: { type: String, required: true },
          alt: { type: String, default: "" },
          index: { type: Number, default: null },
        },
      ],
      default: [],
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
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
    featuredImageAlt: {
      type: String,
      required: false,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: Object,
      default: { url: "", publicId: null },
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date, 
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Blog model
const Blog = mongoose.model("Blog", BlogSchema);

module.exports = {
  Blog,
};
