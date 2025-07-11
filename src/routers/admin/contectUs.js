let express = require("express");
const {
  addContactUs,
  deleteContactUs,
  getContactUs,
  updateContactUsStatus,
} = require("../../controllers/admin/contectUs");
let router = express.Router();
let auth = require("../../../auth/adminauth");

router.get("/getContectUs",  getContactUs);
router.post("/addContactUs", addContactUs);
router.patch("/contectUs/:id",  updateContactUsStatus);
router.delete("/deleteContectUs/:id", auth, deleteContactUs);

module.exports = router;
