import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, student, isDeleting }) {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card modal-card-sm animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="delete-modal-body">
          <div className="delete-icon-circle">
            <AlertTriangle className="delete-alert-icon" size={28} />
          </div>

          <h3 className="delete-title">Delete Student Record?</h3>
          
          <p className="delete-description">
            Are you sure you want to permanently delete{' '}
            <strong className="delete-target-name">{student.name}</strong> (
            <code>{student.student_id}</code>)?
            <br />
            This action cannot be undone.
          </p>

          <div className="delete-summary-box">
            <div className="summary-row">
              <span className="summary-label">Register No:</span>
              <span className="summary-val">{student.register_number}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Department:</span>
              <span className="summary-val">{student.department}</span>
            </div>
          </div>

          <div className="modal-footer full-buttons">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="spinning" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  <span>Delete Permanently</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
