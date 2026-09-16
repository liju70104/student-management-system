import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { studentService } from './api/studentService';
import Navbar from './components/Navbar';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({ total_students: 0, departments: [] });

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal state
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Fetch all students (supports DRF backend search)
  const fetchStudents = useCallback(async (search = '', silent = false) => {
    if (!silent) setLoading(true);
    setIsRefreshing(true);
    try {
      const data = await studentService.getAll(search);
      setStudents(data);
    } catch (err) {
      console.error('Failed to load students:', err);
      showToast(err.message || 'Could not connect to backend server. Make sure Django is running.', 'error');
    } finally {
      if (!silent) setLoading(false);
      setIsRefreshing(false);
    }
  }, [showToast]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const statsData = await studentService.getStatistics();
      setStats(statsData);
    } catch (err) {
      console.warn('Could not fetch stats:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, [fetchStudents, fetchStats]);

  // Debounced search when user types in search box
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchStudents(searchQuery, true);
    }, 280);
    return () => clearTimeout(handler);
  }, [searchQuery, fetchStudents]);

  // Unique departments for filter dropdown
  const departmentsList = useMemo(() => {
    const fromStats = (stats.departments || []).map((d) => d.department).filter(Boolean);
    const fromStudents = students.map((s) => s.department).filter(Boolean);
    return Array.from(new Set([...fromStats, ...fromStudents])).sort();
  }, [stats.departments, students]);

  // Client-side department filter on currently loaded students
  const filteredStudents = useMemo(() => {
    if (!selectedDepartment) return students;
    return students.filter(
      (s) => (s.department || '').toLowerCase() === selectedDepartment.toLowerCase()
    );
  }, [students, selectedDepartment]);

  // Open Modal for Creating
  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  // Close Student Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  // Handle Form Submit (Add or Edit)
  const handleSubmitStudent = async (formData, setFormErrors) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Edit Operation (PUT)
        const updated = await studentService.update(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
        showToast(`Student "${updated.name}" updated successfully!`, 'success');
      } else {
        // Add Operation (POST)
        const created = await studentService.create(formData);
        setStudents((prev) => [created, ...prev]);
        showToast(`Student "${created.name}" registered successfully!`, 'success');
      }
      handleCloseModal();
      fetchStats();
    } catch (err) {
      console.error('Submit error:', err);
      if (err.data && typeof err.data === 'object') {
        setFormErrors(err.data);
      }
      showToast(err.message || 'Operation failed. Please check form values.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Delete Confirmation
  const handleOpenDeleteModal = (student) => {
    setDeletingStudent(student);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    setIsDeleting(true);
    try {
      await studentService.delete(deletingStudent.id);
      setStudents((prev) => prev.filter((s) => s.id !== deletingStudent.id));
      showToast(`Student record for "${deletingStudent.name}" deleted.`, 'success');
      setDeletingStudent(null);
      fetchStats();
    } catch (err) {
      console.error('Delete error:', err);
      showToast(err.message || 'Failed to delete student.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Modern Header Navigation */}
      <Navbar
        stats={stats}
        onOpenAddModal={handleOpenAddModal}
        onRefresh={() => {
          fetchStudents(searchQuery);
          fetchStats();
          showToast('Data refreshed', 'info');
        }}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="main-content">
        <div className="page-header">
          <div>
            <h2 className="page-heading">Student Directory</h2>
            <p className="page-subheading">
              Manage enrollments, update academic profiles, and search student records in real time.
            </p>
          </div>
        </div>

        {/* Student Records Table & Controls */}
        <StudentTable
          students={filteredStudents}
          loading={loading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          selectedDepartment={selectedDepartment}
          onDepartmentSelect={setSelectedDepartment}
          departmentsList={departmentsList}
          onEditStudent={handleOpenEditModal}
          onDeleteStudent={handleOpenDeleteModal}
          onOpenAddModal={handleOpenAddModal}
        />
      </main>

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitStudent}
        student={editingStudent}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingStudent)}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleConfirmDelete}
        student={deletingStudent}
        isDeleting={isDeleting}
      />
    </div>
  );
}
