const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const {
  createScan,
  getAllScans,
  getScanById,
} = require("../models/scan.model");
const PDFDocument = require("pdfkit");
const axios = require("axios");

const upload = multer({ storage: multer.memoryStorage() });

const uploadBufferToCloudinary = (
  buffer,
  filename,
  folder = "oralvis/scans"
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: filename, resource_type: "image" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });
};

const uploadScan = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { patientName, patientId, scanType, region } = req.body || {};
      if (!patientName || !patientId || !scanType || !region) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      const filename = `${patientId}-${Date.now()}`;
      const cloudRes = await uploadBufferToCloudinary(
        req.file.buffer,
        filename
      );

      const payload = {
        patientName,
        patientId,
        scanType,
        region,
        imageUrl: cloudRes.secure_url,
        uploadedBy: req.user.id,
      };
      const id = await createScan(payload);

      return res
        .status(201)
        .json({ id, ...payload, uploadDate: new Date().toISOString() });
    } catch (err) {
      console.error("Upload scan error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  },
];

const listScans = async (req, res) => {
  try {
    const scans = await getAllScans();
    return res.json(scans);
  } catch (err) {
    console.error("List scans error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const downloadReport = async (req, res) => {
  try {
    const { id } = req.params;
    const scan = await getScanById(id);
    if (!scan) return res.status(404).json({ message: "Scan not found" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="report-${scan.patientId}-${scan.id}.pdf"`
    );

    const doc = new PDFDocument({ autoFirstPage: false });
    doc.info.Title = `OralVis Report - ${scan.patientId}`;

    doc.on("error", (e) => console.error("PDF error:", e));
    doc.pipe(res);

    doc.addPage({ size: "A4", margin: 50 });

    doc
      .fontSize(20)
      .text("OralVis Healthcare - Scan Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Patient Name: ${scan.patientName}`);
    doc.text(`Patient ID: ${scan.patientId}`);
    doc.text(`Scan Type: ${scan.scanType}`);
    doc.text(`Region: ${scan.region}`);
    doc.text(`Upload Date: ${scan.uploadDate}`);
    doc.moveDown();

    if (scan.imageUrl) {
      try {
        const imgRes = await axios.get(scan.imageUrl, {
          responseType: "arraybuffer",
        });
        const imgBuffer = Buffer.from(imgRes.data, "binary");

        const maxWidth = 500;
        const left = (doc.page.width - maxWidth) / 2;
        doc.text("Scan Image:", { underline: true });
        doc.moveDown(0.5);
        doc.image(imgBuffer, left, doc.y, { width: maxWidth, align: "center" });
      } catch (imgErr) {
        console.warn("Could not embed image into PDF:", imgErr.message);
        doc.moveDown();
        doc.fillColor("red").text("Image preview unavailable in PDF.");
        doc.fillColor("black");
      }
    }

    doc.end();
  } catch (err) {
    console.error("Report error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  uploadScan,
  listScans,
  downloadReport,
};
