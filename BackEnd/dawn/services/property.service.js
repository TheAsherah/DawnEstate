const { Property } = require("../models/Property"); // Bdel l-path 3la 7sab fin kayn model dyalk

const createProperty = async ({
  title,
  slug,
  price,
  category,
  prestation,
  city,
  address,
  surface,
  bedrooms,
  bathrooms,
  pool,
  metaTitle,
  metaDescription,
  description,
  mainImage,
  gallery,
  user,
}) => {
  const property = await Property.create({
    title,
    slug,
    price,
    category,
    prestation,
    city,
    address,
    surface,
    bedrooms,
    bathrooms,
    pool,
    metaTitle,
    metaDescription,
    description,
    mainImage,
    gallery,
    user,
  });

  return property;
};

module.exports = {
  createProperty,
};