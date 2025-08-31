import "./ScanCard.css";

const ScanCard = ({ scan, onView, onDownload }) => {
  return (
    <div className="scan-card">
      <div className="scan-card__image">
        <img
          src={scan.imageUrl}
          alt={`scan-${scan.patientId}`}
          className="scan-card__img"
        />
      </div>

      <div className="scan-card__details">
        <div className="scan-card__info">
          <div>
            <div className="scan-card__label">Patient</div>
            <div className="scan-card__name">{scan.patientName}</div>
            <div className="scan-card__id">{scan.patientId}</div>
          </div>

          <div className="scan-card__meta">
            <div className="scan-card__date">
              {new Date(scan.uploadDate).toLocaleString()}
            </div>
            <div className="scan-card__type">
              Scan: {scan.scanType} • {scan.region}
            </div>
          </div>
        </div>

        <div className="scan-card__actions">
          <button onClick={() => onView(scan)} className="btn btn-outline">
            View Full Image
          </button>
          <button onClick={() => onDownload(scan)} className="btn btn-primary">
            Download Report (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanCard;
