const express = require("express");
const {
  createblogCtrl,
  getblogsCtrl,
  getallBlogsCtrl,
  rejectblogCtrl,
  acceptblogCtrl,
  getlastBlogsCtrl,
  getSingleBlogCtrl,
  getblogsitemapCtrl,
  updateblogCTRL,
  createAIBlogCtrl
} = require("../controllers/blogcontroller");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "/tmp/images/" }); 


router.get("/", getblogsitemapCtrl);
router.get("/getlastBlogs", getlastBlogsCtrl);
router.get("/getblogs", getblogsCtrl);
router.get("/getallblogs", getallBlogsCtrl);

router.get("/:slug", getSingleBlogCtrl);

router.use(verifyToken);
router.post(
  "/createaiblog",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createAIBlogCtrl
);

router.put("/updateblog/:id", updateblogCTRL);
router.post(
  "/AddBlog", 
  upload.fields([
    { name: "featuredImage", maxCount: 1 },    
    { name: "galleryImages", maxCount: 10 }    
  ]), 
  createblogCtrl
);




router.post("/delete", rejectblogCtrl);
router.post("/accepctblog", acceptblogCtrl);
module.exports = router;
