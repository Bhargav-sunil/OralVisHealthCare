import { X } from "lucide-react";
import "./ImageModal.css";

const ImageModal = ({ open, onClose, src, alt }) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Full Image</h2>
          <button onClick={onClose} aria-label="Close" className="close-button">
            <X className="icon" />
          </button>
        </div>

        <div className="modal-body">
          <img src={src} alt={alt} className="modal-image" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
