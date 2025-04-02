import React, { useRef } from 'react';
import { AuthProvider } from './AuthProvider';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { OTPVerification } from './OTPVerification';
import '../styles/auth.css';

/**
 * This component is used to generate a screenshot for the repository preview.
 * It displays all authentication components in a preview layout.
 */
export function Screenshot() {
  // Initialize the theme colors
  React.useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', '#6366f1');
    document.documentElement.style.setProperty('--secondary-color', '#8b5cf6');
    document.documentElement.style.setProperty('--accent-color', '#ec4899');
    document.documentElement.style.setProperty('--background-color', '#f8fafc');
    document.documentElement.style.setProperty('--text-color', '#1e293b');
  }, []);

  return (
    <div className="screenshot-container">
      <div className="device-preview">
        <div className="device-frame">
          <div className="device-content">
            <AuthProvider>
              <div className="auth-container">
                <h1>Authen</h1>
                <div className="preview-forms">
                  <div className="form-section">
                    <h2>Login</h2>
                    <LoginForm 
                      onSuccess={() => console.log('Login success')}
                      onError={(error) => console.log('Login error:', error)}
                    />
                  </div>
                </div>
              </div>
            </AuthProvider>
          </div>
        </div>
      </div>
      
      <div className="preview-components">
        <AuthProvider>
          <div className="preview-row">
            <div className="preview-item">
              <div className="form-section">
                <h2>Register</h2>
                <RegisterForm
                  onSuccess={() => console.log('Registration success')}
                  onError={(error) => console.log('Registration error:', error)}
                />
              </div>
            </div>
            
            <div className="preview-item">
              <div className="form-section">
                <h2>OTP Verification</h2>
                <OTPVerification
                  phoneNumber="+1234567890"
                  onSuccess={() => console.log('OTP verified')}
                  onError={(error) => console.log('OTP error:', error)}
                />
              </div>
            </div>
          </div>
        </AuthProvider>
      </div>
    </div>
  );
} 