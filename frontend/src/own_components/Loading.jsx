import React from "react";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-primary" role="status" style={{ width: 60, height: 60 }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
