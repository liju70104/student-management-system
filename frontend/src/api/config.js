/**
 * Centralized API configuration for Student Management System.
 * Supports configurable API Base URL via Vite environment variables:
 * - VITE_API_URL (e.g., https://your-backend.onrender.com)
 * - VITE_API_BASE_URL
 * Defaults to 'http://127.0.0.1:8000' for local development.
 */

const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000';

// Strip any trailing slashes for clean URL concatenation
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/api/login/`,
  students: `${API_BASE_URL}/api/students`,
};
