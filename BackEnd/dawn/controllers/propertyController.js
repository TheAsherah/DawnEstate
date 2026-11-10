const { Property } = require("../models/Property");
const User = require("../models/User");
const PropertyService = require("../services/property.service");
const { cloudinaryUploadImage } = require("../utils/cloudinary");

/** --------------------------------------------------
 * @desc    Create new Property
 * @route   /api/Property
 -------------------------------------------------- **/
exports.createPropertyCtrl = async (req, res) => {
  const {
    title,
    slug,
    price,
    category,
    prestation, // sale / rent
    city,
    address,
    surface,
    bedrooms,
    bathrooms,
    pool,
    metaTitle,
    metaDescription,
    description,
  } = req.body;

  const user = req.id;
  const files = req.files;

  try {
    let staff = await User.findById(user);
    if (!staff) {
      return res
        .status(403)
        .json({ message: "Access denied. Staff or admin only." });
    }

    if (!title || !price || !city || !files?.mainImage) {
      return res.status(400).json({
        message: "Title, price, city, and main image are required",
      });
    }

    // Upload main image to Cloudinary
    const mainImageUpload = await cloudinaryUploadImage(
      files.mainImage[0].path
    );

    // Upload gallery images to Cloudinary
    let galleryImages = [];
    if (files.gallery && files.gallery.length > 0) {
      for (const img of files.gallery) {
        const uploaded = await cloudinaryUploadImage(img.path);
        galleryImages.push({
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
        });
      }
    }

    // Call your Property service / model to save in database
    const newProperty = await PropertyService.createProperty({
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
      user,
      mainImage: {
        url: mainImageUpload.secure_url,
        publicId: mainImageUpload.public_id,
      },
      gallery: galleryImages,
    });

    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res
      .status(500)
      .json({ message: "Error creating property", error: error.message });
  }
};

exports.getAllPropertiesCtrl = async (req, res) => {
  try {
    const properties = await Property.find({ accepted: true })
      .sort({ createdAt: -1 })
      .lean();

    if (!properties.length) {
      return res.status(404).json({ message: "No properties found" });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Error fetching properties", error });
  }
};

exports.getSinglePropertyCtrl = async (req, res) => {
  try {
    const { slug } = req.params;
    log;
    if (!slug) {
      return res.status(400).json({ message: "Property slug is required" });
    }

    const property = await Property.findOne({ slug, accepted: true }).lean();

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/* ================= GET PROPERTIES (ADMIN LIST) ================= */
exports.getPropertiesCtrl = async (req, res) => {
  try {
    const properties = await Property.find()
      .select("title city price category prestation mainImage accepted")
      .lean();

    if (!properties.length) {
      return res.status(404).json({ message: "No properties found" });
    }

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= SITEMAP ================= */
exports.getPropertySitemapCtrl = async (req, res) => {
  try {
    const properties = await Property.find().select("slug").lean();

    if (!properties.length) {
      return res.status(404).json({ message: "No properties found" });
    }

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= LAST PROPERTIES ================= */
exports.getLastPropertiesCtrl = async (req, res) => {
  try {
    const properties = await Property.find({ accepted: true })
      .select(
        "title mainImage city price surface bedrooms bathrooms prestation"
      )
      .sort({ _id: -1 })
      .limit(3)
      .lean();

    if (!properties.length) {
      return res.status(404).json({ message: "No properties found" });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching last properties:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= REJECT PROPERTY ================= */
exports.rejectPropertyCtrl = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedProperty = await Property.findOneAndDelete({ _id: id });

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property deleted successfully",
      deletedProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
};

/* ================= ACCEPT PROPERTY ================= */
exports.acceptPropertyCtrl = async (req, res) => {
  try {
    const { id } = req.body;

    const updatedProperty = await Property.findOneAndUpdate(
      { _id: id },
      { accepted: true },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property accepted successfully",
      updatedProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error accepting property", error });
  }
};
