import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle, 
  Loader2,
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import { authService } from '../api/authService';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both your username and password.');
      return;
    }

    setIsLoading(true);
    try {
      const user = await authService.login(username, password);
      onLoginSuccess(user);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="login-page-container">
      {/* Background Decorative Ambient Glows */}
      <div className="login-bg-glow glow-1"></div>
      <div className="login-bg-glow glow-2"></div>

      <div className="login-card glass-panel animate-scale-up">
        {/* Brand Header */}
        <div className="login-brand">
          <div className="login-icon-box">
            <GraduationCap className="login-icon" size={32} />
          </div>
          <h1 className="login-title">Student Management</h1>
          <p className="login-subtitle">
            Sign in to access student records and administrative tools
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="login-error-alert animate-fade-in" role="alert">
            <AlertCircle size={18} className="login-error-icon" />
            <span className="login-error-text">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">
              <User size={15} />
              <span>Username</span>
            </label>
            <div className="input-with-icon">
              <input
                id="username"
                type="text"
                className="login-input"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                autoComplete="username"
                autoFocus
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">
              <Lock size={15} />
              <span>Password</span>
            </label>
            <div className="input-with-icon password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary btn-login-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="spinning" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className="demo-credentials-box">
          <div className="demo-header">
            <KeyRound size={14} className="demo-icon" />
            <span className="demo-title">Demo Access</span>
          </div>
          <p className="demo-desc">
            Use demo username: <code>admin</code>
          </p>
          <button
            type="button"
            className="btn-demo-autofill"
            onClick={handleFillDemo}
          >
            <ShieldCheck size={14} />
            <span>Fill Demo Credentials</span>
          </button>
        </div>
      </div>
    </div>
  );
}
