import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Header from "../../components/Header/Header";
import ScanCard from "../../components/ScanCard/ScanCard";
import ImageModal from "../../components/ImageModal/ImageModal";
import { getAuth } from "../../utils/auth";
import jsPDF from "jspdf";
import { RefreshCw } from "lucide-react";
import "./DentistViewer.css";

const DentistViewer = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, src: null, alt: "" });
  const { user } = getAuth();

  useEffect(() => {
    fetchScans();
  }, []);

  async function fetchScans() {
    setLoading(true);
    try {
      const res = await api.get("/api/scans");
      setScans(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function onView(scan) {
    setModal({
      open: true,
      src: scan.imageUrl,
      alt: `${scan.patientName} - ${scan.patientId}`,
    });
  }

  async function onDownload(scan) {
    try {
      const res = await api.get(`/api/scans/${scan.id}/report`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `report-${scan.patientId}-${scan.id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Error downloading report:", err);
      try {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("OralVis Healthcare - Scan Report", 14, 20);
        doc.setFontSize(12);
        doc.text(`Patient Name: ${scan.patientName}`, 14, 40);
        doc.text(`Patient ID: ${scan.patientId}`, 14, 50);
        doc.text(`Scan Type: ${scan.scanType}`, 14, 60);
        doc.text(`Region: ${scan.region}`, 14, 70);
        doc.text(
          `Upload Date: ${new Date(scan.uploadDate).toLocaleString()}`,
          14,
          80
        );
        doc.save(`report-${scan.patientId}-${scan.id}.pdf`);
      } catch (pdfErr) {
        console.error(pdfErr);
      }
    }
  }

  return (
    <>
      <Header />
      <main className="dentist-viewer">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Dentist — Scan Viewer</h2>
              <p>
                Welcome, <span>{user?.email}</span>
              </p>
            </div>
            <button
              onClick={() => fetchScans()}
              className="refresh-btn"
              aria-label="Refresh scans"
            >
              <RefreshCw className="icon" /> Refresh
            </button>
          </div>

          <div className="scan-list">
            {loading && <div className="status-message">Loading scans...</div>}
            {!loading && scans.length === 0 && (
              <div className="status-message">No scans available yet.</div>
            )}
            {!loading &&
              scans.map((s) => (
                <ScanCard
                  key={s.id}
                  scan={s}
                  onView={onView}
                  onDownload={onDownload}
                />
              ))}
          </div>
        </div>
      </main>

      <ImageModal
        open={modal.open}
        onClose={() => setModal({ open: false, src: null })}
        src={modal.src}
        alt={modal.alt}
      />
    </>
  );
};

export default DentistViewer;
