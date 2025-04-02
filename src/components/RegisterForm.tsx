import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  config?: {
    buttonText?: string;
    emailLabel?: string;
    passwordLabel?: string;
    nameLabel?: string;
    confirmPasswordLabel?: string;
  };
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  config = {
    buttonText: 'Register',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    nameLabel: 'Full Name',
    confirmPasswordLabel: 'Confirm Password',
  },
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters long');
      return;
    }

    try {
      await register({ name, email, password });
      onSuccess?.();
    } catch (err) {
      onError?.(error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="name">{config.nameLabel}</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">{config.emailLabel}</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">{config.passwordLabel}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">{config.confirmPasswordLabel}</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      {(error || validationError) && (
        <div className="error-message">{error || validationError}</div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : config.buttonText}
      </button>
    </form>
  );
}; 