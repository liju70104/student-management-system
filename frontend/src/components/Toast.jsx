import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="toast-container animate-slide-in">
      <div className={`toast-card ${toast.type}`}>
        <div className="toast-icon-wrapper">
          {isSuccess && <CheckCircle2 className="toast-icon success" size={20} />}
          {isError && <AlertCircle className="toast-icon error" size={20} />}
          {!isSuccess && !isError && <Info className="toast-icon info" size={20} />}
        </div>
        <div className="toast-content">
          <span className="toast-title">
            {isSuccess ? 'Success' : isError ? 'Error' : 'Notification'}
          </span>
          <p className="toast-message">{toast.message}</p>
        </div>
        <button className="toast-close" onClick={onClose} aria-label="Close notification">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
