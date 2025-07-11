let {
  addGallery,
  addGalleryCategory,
  deleteGallery,
  deleteGalleryCategory,
  getGalleries,
  getGalleryCategories,
  updateGallery,
  updateGalleryCategory,
} = require("../../controllers/admin/gallery");
let express = require("express");
let router = express.Router();
const auth = require("../../../auth/adminauth");
const multer = require("multer");
const path = require("path");

// File storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isVideo = file.fieldname === "video";
    cb(null, isVideo ? "public/gallery/videos" : "public/gallery/images");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${Date.now()}${ext}`);
  },
});

// File filter (restrict file types)
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "video") {
    const allowedVideoTypes = ["video/mp4", "video/mov", "video/avi", "video/webm"];
    if (!allowedVideoTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid video format"), false);
    }
  } else if (file.fieldname === "image") {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid image format"), false);
    }
  }
  cb(null, true);
};

// Limits (optional: you can set file size limits here)
const limits = {
  fileSize: 100 * 1024 * 1024, // 100 MB max per file
};

// Multer uploader
const upload = multer({ storage, fileFilter, limits });

const mediaField = upload.fields([
  { name: "image", maxCount: 15 },
  { name: "video", maxCount: 1 },
]);


// Gallery Category
router.post("/addGalleryCategory",  addGalleryCategory);
router.put("/updateGalleryCategory/:id",  updateGalleryCategory);
router.delete("/deleteGalleryCategory/:id",  deleteGalleryCategory);
router.get("/getGalleryCategory", getGalleryCategories);

// Gallery
router.post("/addGallery",  mediaField, addGallery);
router.put("/updateGallery/:id",  mediaField, updateGallery);
router.delete("/deleteGallery/:id",  deleteGallery);
router.get("/getGallery", getGalleries);

module.exports = router;
