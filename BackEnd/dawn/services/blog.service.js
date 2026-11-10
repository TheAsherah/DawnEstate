const { Blog } = require("../models/Blog");

const createBlog = async ({
  title,
  slug,
  category,
  tags,
  metaTitle,
  metaDescription,
  featuredImageAlt,
  content,
  description,
  image,
  user,
  galleryImages,
}) => {
  const blog = await Blog.create({
    title,
    slug,
    category,
    tags,
    metaTitle,
    metaDescription,
    featuredImageAlt,
    content,
    description,
    galleryImages,
    image,
    user,
  });

  await blog.save();
  return blog;
};

module.exports = {
  createBlog,
};
