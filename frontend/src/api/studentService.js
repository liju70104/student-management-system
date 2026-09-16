const API_BASE_URL = 'http://127.0.0.1:8000/api/students';

/**
 * Handle API responses with structured JSON error decoding
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: response.statusText || 'An unexpected error occurred' };
    }
    
    // Format error message nicely from DRF response
    let message = 'Operation failed';
    if (typeof errorData === 'object' && errorData !== null) {
      if (errorData.detail) {
        message = errorData.detail;
      } else {
        // Collect field error messages
        const fieldErrors = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(' ') : value}`)
          .join(' | ');
        if (fieldErrors) message = fieldErrors;
      }
    }
    const err = new Error(message);
    err.data = errorData;
    err.status = response.status;
    throw err;
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

export const studentService = {
  /**
   * Fetch students with optional search query
   */
  async getAll(search = '') {
    const url = search ? `${API_BASE_URL}/?search=${encodeURIComponent(search)}` : `${API_BASE_URL}/`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  /**
   * Fetch single student by id
   */
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}/`);
    return handleResponse(response);
  },

  /**
   * Create a new student
   */
  async create(studentData) {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  /**
   * Update student details
   */
  async update(id, studentData) {
    const response = await fetch(`${API_BASE_URL}/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  /**
   * Delete student by id
   */
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/${id}/`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  /**
   * Fetch stats (total count, department breakdown)
   */
  async getStatistics() {
    const response = await fetch(`${API_BASE_URL}/statistics/`);
    return handleResponse(response);
  }
};
