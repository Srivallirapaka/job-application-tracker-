import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { setAuthState, setError } from '../redux/authSlice';
import { authAPI } from '../services/api';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setLocalError('');
    setFormErrors({});

    try {
      const response = await authAPI.login(formData.email, formData.password);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(setAuthState({ token, user }));
      navigate('/dashboard');
    } catch (err) {
      let errorMessage = 'Unable to connect to server. Please check your connection or try again later.';
      
      if (err.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message === 'Network Error') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      setLocalError(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card login-card">
        <div className="auth-header">
          <div className="auth-icon">🚀</div>
          <h1>Job Tracker</h1>
          <p className="subtitle">Track Your Dream Job Applications</p>
        </div>

        {error && (
          <div className="error-message error-banner">
            <span>⚠️</span>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={formErrors.email ? 'input-error' : ''}
              />
            </div>
            {formErrors.email && <span className="field-error">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper password-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={formErrors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {formErrors.password && <span className="field-error">{formErrors.password}</span>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="spinner" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>New to Job Tracker?</span>
        </div>

        <Link to="/register" className="register-link">
          Create an account
        </Link>
      </div>

      <div className="auth-info">
        <div className="info-card">
          <span className="info-icon">📊</span>
          <h3>Track Applications</h3>
          <p>Organize all your job applications in one place</p>
        </div>
        <div className="info-card">
          <span className="info-icon">🎯</span>
          <h3>Kanban Board</h3>
          <p>Visualize your progress with our Kanban board</p>
        </div>
        <div className="info-card">
          <span className="info-icon">🚀</span>
          <h3>Get Hired</h3>
          <p>Manage your job search efficiently</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
