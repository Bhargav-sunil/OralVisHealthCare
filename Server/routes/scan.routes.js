const router = require("express").Router();
const auth = require("../middleware/auth");
const { requireRole } = require("../middleware/roles");
const {
  uploadScan,
  listScans,
  downloadReport,
} = require("../controllers/scan.controller");

router.post("/", auth, requireRole("technician"), uploadScan);
router.get("/", auth, requireRole("dentist"), listScans);
router.get("/:id/report", auth, requireRole("dentist"), downloadReport);

module.exports = router;
