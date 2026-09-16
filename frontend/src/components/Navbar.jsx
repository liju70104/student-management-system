import React from 'react';
import { GraduationCap, Users, Building2, Plus, RefreshCw } from 'lucide-react';

export default function Navbar({ stats, onOpenAddModal, onRefresh, isRefreshing }) {
  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <div className="brand-group">
          <div className="brand-icon-box">
            <GraduationCap className="brand-icon" size={28} />
          </div>
          <div>
            <div className="brand-badge">PORTAL v1.0</div>
            <h1 className="brand-title">Student Management System</h1>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="navbar-actions">
          <div className="stats-pills">
            <div className="stat-pill" title="Total active registered students">
              <Users size={16} className="stat-icon" />
              <span className="stat-label">Students:</span>
              <span className="stat-value">{stats?.total_students ?? 0}</span>
            </div>
            <div className="stat-pill" title="Distinct departments">
              <Building2 size={16} className="stat-icon" />
              <span className="stat-label">Departments:</span>
              <span className="stat-value">{stats?.departments?.length ?? 0}</span>
            </div>
          </div>

          <button
            className={`btn-icon ${isRefreshing ? 'spinning' : ''}`}
            onClick={onRefresh}
            title="Reload student data"
            aria-label="Reload student data"
          >
            <RefreshCw size={18} />
          </button>

          <button className="btn-primary" onClick={onOpenAddModal}>
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </header>
  );
}
