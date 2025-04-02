import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  config?: {
    buttonText?: string;
    emailLabel?: string;
    passwordLabel?: string;
  };
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onError,
  config = {
    buttonText: 'Login',
    emailLabel: 'Email',
    passwordLabel: 'Password',
  },
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      onSuccess?.();
    } catch (err) {
      onError?.(error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
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
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : config.buttonText}
      </button>
    </form>
  );
}; 