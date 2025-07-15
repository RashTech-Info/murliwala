let express = require("express");
let router = express.Router();
let auth = require("../../../auth/adminauth");
const multer = require("multer");
const {
  Update_admin,
} = require("../../controllers/admin/admin_profile_update");
const path = require("path");
const fs = require("fs");
const uploadPath = path.join(__dirname, "../public/uploads");

// Ensure the folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router.put("/update_profile", upload.single("admin_image"), Update_admin);
module.exports = router;
