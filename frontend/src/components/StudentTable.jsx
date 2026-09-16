import React from 'react';
import { 
  Search, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  Hash, 
  Building2, 
  UserX, 
  Plus, 
  XCircle,
  GraduationCap 
} from 'lucide-react';

// Generates consistent color pairs based on department name
function getDepartmentBadgeClass(department = '') {
  const dept = department.toLowerCase();
  if (dept.includes('computer') || dept.includes('software')) return 'badge-indigo';
  if (dept.includes('info') || dept.includes('data') || dept.includes('ai')) return 'badge-cyan';
  if (dept.includes('mech')) return 'badge-amber';
  if (dept.includes('electr')) return 'badge-purple';
  if (dept.includes('civil')) return 'badge-emerald';
  if (dept.includes('business') || dept.includes('manage')) return 'badge-rose';
  return 'badge-blue';
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'ST';
}

export default function StudentTable({
  students,
  loading,
  searchQuery,
  onSearchChange,
  onClearSearch,
  selectedDepartment,
  onDepartmentSelect,
  departmentsList,
  onEditStudent,
  onDeleteStudent,
  onOpenAddModal,
}) {
  return (
    <div className="table-section">
      {/* Control Bar: Search & Filter */}
      <div className="controls-card glass-panel">
        <div className="search-box-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, student ID, register no, department, email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={onClearSearch}
              title="Clear search"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>

        {/* Department Filter Pills */}
        <div className="filter-group">
          <Building2 size={16} className="filter-icon" />
          <select
            className="department-select"
            value={selectedDepartment}
            onChange={(e) => onDepartmentSelect(e.target.value)}
          >
            <option value="">All Departments</option>
            {departmentsList.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="results-header">
        <div className="results-counter">
          <span>Showing <strong>{students.length}</strong> {students.length === 1 ? 'student' : 'students'}</span>
          {(searchQuery || selectedDepartment) && (
            <span className="filtered-indicator">
              (filtered
              {searchQuery && ` for "${searchQuery}"`}
              {selectedDepartment && ` in ${selectedDepartment}`})
            </span>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="table-card glass-panel">
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Register No</th>
                <th>Department</th>
                <th>Contact Info</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Skeleton loading state
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="skeleton-row">
                    <td>
                      <div className="skeleton-cell avatar-name">
                        <div className="skeleton-avatar"></div>
                        <div className="skeleton-text"></div>
                      </div>
                    </td>
                    <td><div className="skeleton-pill"></div></td>
                    <td><div className="skeleton-text small"></div></td>
                    <td><div className="skeleton-pill"></div></td>
                    <td><div className="skeleton-text medium"></div></td>
                    <td><div className="skeleton-actions"></div></td>
                  </tr>
                ))
              ) : students.length > 0 ? (
                // Students Rows
                students.map((student) => (
                  <tr key={student.id} className="student-row animate-fade-in">
                    {/* Student Identity */}
                    <td>
                      <div className="student-profile">
                        <div className="student-avatar">
                          {getInitials(student.name)}
                        </div>
                        <div className="student-meta">
                          <span className="student-name">{student.name}</span>
                          <span className="student-subtext">Registered Student</span>
                        </div>
                      </div>
                    </td>

                    {/* Student ID */}
                    <td>
                      <span className="id-badge">
                        <Hash size={13} />
                        {student.student_id}
                      </span>
                    </td>

                    {/* Register Number */}
                    <td>
                      <span className="register-text">
                        {student.register_number}
                      </span>
                    </td>

                    {/* Department */}
                    <td>
                      <span className={`dept-badge ${getDepartmentBadgeClass(student.department)}`}>
                        <GraduationCap size={13} />
                        {student.department}
                      </span>
                    </td>

                    {/* Contact Info */}
                    <td>
                      <div className="contact-column">
                        <a
                          href={`mailto:${student.email}`}
                          className="contact-link"
                          title={`Email ${student.email}`}
                        >
                          <Mail size={13} />
                          <span>{student.email}</span>
                        </a>
                        <a
                          href={`tel:${student.phone}`}
                          className="contact-link"
                          title={`Call ${student.phone}`}
                        >
                          <Phone size={13} />
                          <span>{student.phone}</span>
                        </a>
                      </div>
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="actions-cell">
                      <div className="actions-group">
                        <button
                          className="btn-table-action edit"
                          onClick={() => onEditStudent(student)}
                          title="Edit student details"
                          aria-label={`Edit ${student.name}`}
                        >
                          <Edit3 size={15} />
                          <span>Edit</span>
                        </button>
                        <button
                          className="btn-table-action delete"
                          onClick={() => onDeleteStudent(student)}
                          title="Delete student record"
                          aria-label={`Delete ${student.name}`}
                        >
                          <Trash2 size={15} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // Empty State
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state animate-fade-in">
                      <div className="empty-icon-box">
                        <UserX size={44} className="empty-icon" />
                      </div>
                      <h3 className="empty-title">
                        {searchQuery || selectedDepartment
                          ? 'No matching students found'
                          : 'No students registered yet'}
                      </h3>
                      <p className="empty-subtitle">
                        {searchQuery || selectedDepartment
                          ? 'Try adjusting your search query or selecting a different department filter.'
                          : 'Get started by creating your first student record in the database.'}
                      </p>
                      <div className="empty-actions">
                        {searchQuery || selectedDepartment ? (
                          <button
                            className="btn-secondary"
                            onClick={() => {
                              onClearSearch();
                              onDepartmentSelect('');
                            }}
                          >
                            Reset Filters
                          </button>
                        ) : (
                          <button
                            className="btn-primary"
                            onClick={onOpenAddModal}
                          >
                            <Plus size={16} />
                            <span>Add Student</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
