let {
  addInquiry,
  deleteInquiry,
  getInquiries,
  updateInquiry,
} = require("../../controllers/admin/inquiry");
let express = require("express");
let router = express.Router();
const auth = require("../../../auth/adminauth");

router.post("/submitInquiry", addInquiry);
router.get("/getInquiry",  getInquiries);
router.patch("/updateInquiryStatus/:id",  updateInquiry);
router.delete("/deleteInquiry/:id",  deleteInquiry);

module.exports = router;
