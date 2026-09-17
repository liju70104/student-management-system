import { API_ENDPOINTS } from './config';

const AUTH_API_URL = API_ENDPOINTS.login;
const STORAGE_KEY = 'sms_auth_user';

export const authService = {
  /**
   * Log in user with username and password
   */
  async login(username, password) {
    const trimmedUsername = (username || '').trim();
    const trimmedPassword = (password || '').trim();

    if (!trimmedUsername || !trimmedPassword) {
      throw new Error('Please enter both username and password.');
    }

    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password: trimmedPassword,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = data.detail || 'Invalid username or password. Please try again.';
        throw new Error(errorMsg);
      }

      const userSession = {
        username: data.user?.username || trimmedUsername,
        name: data.user?.name || 'Administrator',
        role: data.user?.role || 'Admin',
        token: data.token || 'auth-token-admin',
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(userSession));
      return userSession;
    } catch (err) {
      // Fallback for demo credentials if network connection to backend fails
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        if (trimmedUsername === 'admin' && trimmedPassword === 'admin123') {
          const userSession = {
            username: 'admin',
            name: 'Administrator',
            role: 'Admin',
            token: 'auth-token-admin',
            loginTime: new Date().toISOString(),
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userSession));
          return userSession;
        } else {
          throw new Error('Invalid username or password.');
        }
      }
      throw err;
    }
  },

  /**
   * Get currently logged-in user from localStorage
   */
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Log out user and clear stored authentication session
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Check if active session exists
   */
  isAuthenticated() {
    return Boolean(this.getCurrentUser());
  }
};
