const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

const multer = require("multer");
const {
  getPropertySitemapCtrl,
  getLastPropertiesCtrl,
  getPropertiesCtrl,
  getAllPropertiesCtrl,
  getSinglePropertyCtrl,
  rejectPropertyCtrl,
  acceptPropertyCtrl,
  createPropertyCtrl,
} = require("../controllers/propertyController"); // Bdel l-path 3la 7sab fin kaynin controllers dyalk

const upload = multer({ dest: "/tmp/images/" });

/* ================= PUBLIC ROUTES ================= */
router.get("/", getPropertySitemapCtrl);
router.get("/getlastproperties", getLastPropertiesCtrl);
router.get("/getproperties", getPropertiesCtrl);
router.get("/getallproperties", getAllPropertiesCtrl);
router.get("/:slug", getSinglePropertyCtrl);

/* ================= PROTECTED ROUTES ================= */
router.use(verifyToken);

router.post(
  "/add",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createPropertyCtrl
);

router.post("/delete", rejectPropertyCtrl);
router.post("/acceptproperty", acceptPropertyCtrl);

module.exports = router;
