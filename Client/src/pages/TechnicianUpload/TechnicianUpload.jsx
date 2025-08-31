import React, { useState } from "react";
import api from "../../api/axios";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { getAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./TechnicianUpload.css";

const TechnicianUpload = () => {
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [scanType] = useState("RGB");
  const [region, setRegion] = useState("Frontal");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const { user } = getAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (!patientName || !patientId || !region || !file) {
      setMsg({
        type: "error",
        text: "Please fill all fields and attach an image.",
      });
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setMsg({ type: "error", text: "Only JPG and PNG files are allowed." });
      return;
    }

    const fd = new FormData();
    fd.append("patientName", patientName);
    fd.append("patientId", patientId);
    fd.append("scanType", scanType);
    fd.append("region", region);
    fd.append("image", file);

    setLoading(true);
    try {
      await api.post("/api/scans", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg({ type: "success", text: "Scan uploaded successfully." });

      setPatientName("");
      setPatientId("");
      setRegion("Frontal");
      setFile(null);
      document.getElementById("scanFileInput").value = "";
    } catch (err) {
      setMsg({
        type: "error",
        text: err?.response?.data?.message || "Upload failed.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="tech-upload-container">
        <div className="tech-upload-wrapper">
          <div className="tech-upload-card">
            <h2 className="tech-upload-title">Technician — Upload Scan</h2>
            <p className="tech-upload-subtitle">Logged in as {user?.email}</p>

            <form onSubmit={handleSubmit} className="tech-upload-form">
              <TextInput
                id="pname"
                label="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
              <TextInput
                id="pid"
                label="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />

              <div className="form-group">
                <label>Scan Type</label>
                <select
                  value={scanType}
                  disabled
                  className="form-select disabled"
                >
                  <option>RGB</option>
                </select>
              </div>

              <div className="form-group">
                <label>Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="form-select"
                >
                  <option>Frontal</option>
                  <option>Upper Arch</option>
                  <option>Lower Arch</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="scanFileInput">Scan Image (JPG/PNG)</label>
                <input
                  id="scanFileInput"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="file-input"
                  aria-label="Upload scan image file"
                />
                {file && (
                  <p className="file-selected">Selected file: {file.name}</p>
                )}
              </div>

              {msg && (
                <div
                  role="alert"
                  aria-live="polite"
                  className={`alert ${
                    msg.type === "error" ? "alert-error" : "alert-success"
                  }`}
                >
                  {msg.text}
                </div>
              )}

              <div className="form-actions">
                <Button type="submit" disabled={loading}>
                  {loading ? "Uploading..." : "Upload Scan"}
                </Button>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => navigate("/viewer")}
                >
                  Go to Dentist Viewer
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default TechnicianUpload;
