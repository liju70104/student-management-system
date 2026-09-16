import React, { useState, useEffect } from 'react';
import { X, User, Hash, GraduationCap, Mail, Phone, Bookmark, Loader2 } from 'lucide-react';

const COMMON_DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Data Science & AI',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Business Administration',
];

export default function StudentModal({ isOpen, onClose, onSubmit, student, isSubmitting }) {
  const isEdit = Boolean(student);

  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    register_number: '',
    department: 'Computer Science',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        student_id: student.student_id || '',
        name: student.name || '',
        register_number: student.register_number || '',
        department: student.department || 'Computer Science',
        email: student.email || '',
        phone: student.phone || '',
      });
    } else {
      setFormData({
        student_id: '',
        name: '',
        register_number: '',
        department: 'Computer Science',
        email: '',
        phone: '',
      });
    }
    setErrors({});
  }, [student, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.student_id.trim()) {
      newErrors.student_id = 'Student ID is required (e.g. STU101)';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.register_number.trim()) {
      newErrors.register_number = 'Register / Roll number is required';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData, setErrors);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {isEdit ? 'Update Details' : 'Registration'}
            </span>
            <h2 className="modal-title">
              {isEdit ? 'Edit Student Profile' : 'Add New Student'}
            </h2>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Student ID */}
            <div className="form-group">
              <label htmlFor="student_id">
                <Bookmark size={14} />
                <span>Student ID *</span>
              </label>
              <input
                id="student_id"
                name="student_id"
                type="text"
                placeholder="e.g. STU101"
                value={formData.student_id}
                onChange={handleChange}
                className={errors.student_id ? 'input-error' : ''}
                autoFocus
              />
              {errors.student_id && (
                <span className="error-text">{errors.student_id}</span>
              )}
            </div>

            {/* Register Number */}
            <div className="form-group">
              <label htmlFor="register_number">
                <Hash size={14} />
                <span>Register Number *</span>
              </label>
              <input
                id="register_number"
                name="register_number"
                type="text"
                placeholder="e.g. REG2024001"
                value={formData.register_number}
                onChange={handleChange}
                className={errors.register_number ? 'input-error' : ''}
              />
              {errors.register_number && (
                <span className="error-text">{errors.register_number}</span>
              )}
            </div>

            {/* Name */}
            <div className="form-group full-width">
              <label htmlFor="name">
                <User size={14} />
                <span>Full Name *</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Department */}
            <div className="form-group full-width">
              <label htmlFor="department">
                <GraduationCap size={14} />
                <span>Department *</span>
              </label>
              <div className="dept-input-container">
                <input
                  id="department"
                  name="department"
                  type="text"
                  list="department-options"
                  placeholder="Select or enter department"
                  value={formData.department}
                  onChange={handleChange}
                  className={errors.department ? 'input-error' : ''}
                />
                <datalist id="department-options">
                  {COMMON_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept} />
                  ))}
                </datalist>
              </div>
              {errors.department && (
                <span className="error-text">{errors.department}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                <Mail size={14} />
                <span>Email Address *</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. student@university.edu"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={14} />
                <span>Phone Number *</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g. +1 555-0199"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'input-error' : ''}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spinning" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEdit ? 'Save Changes' : 'Add Student'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
