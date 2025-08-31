const db = require("../config/database");

const createScan = ({
  patientName,
  patientId,
  scanType,
  region,
  imageUrl,
  uploadedBy,
}) =>
  new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO scans (patientName, patientId, scanType, region, imageUrl, uploadedBy)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [patientName, patientId, scanType, region, imageUrl, uploadedBy],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });

const getAllScans = () =>
  new Promise((resolve, reject) => {
    db.all(
      `SELECT s.*, u.name as uploadedByName
       FROM scans s
       JOIN users u ON s.uploadedBy = u.id
       ORDER BY datetime(uploadDate) DESC, id DESC`,
      [],
      (err, rows) => (err ? reject(err) : resolve(rows))
    );
  });

const getScanById = (id) =>
  new Promise((resolve, reject) => {
    db.get(`SELECT * FROM scans WHERE id = ?`, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

module.exports = {
  createScan,
  getAllScans,
  getScanById,
};
