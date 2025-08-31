import React from "react";
import "./TextInput.css";

const TextInput = ({ label, id, type = "text", error, ...props }) => {
  return (
    <div className="text-input-wrapper">
      {label && (
        <label htmlFor={id} className="text-input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        {...props}
        className={`text-input-field ${error ? "input-error" : ""}`}
      />
      {error && (
        <p className="text-input-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
