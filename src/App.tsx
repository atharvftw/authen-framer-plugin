import React, { useState } from 'react';
import { AuthProvider } from './components/AuthProvider';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { OTPVerification } from './components/OTPVerification';
import { ColorPicker } from './components/ColorPicker';
import './styles/auth.css';

export function App() {
    const [theme, setTheme] = useState({
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#f8fafc',
        text: '#1e293b',
    });

    const handleColorChange = (colorType: string) => (color: string) => {
        setTheme(prev => ({ ...prev, [colorType]: color }));
        document.documentElement.style.setProperty(`--${colorType}-color`, color);
    };

    return (
        <div className="app-container">
            <div className="theme-controls">
                <div className="theme-control-group">
                    <label>Primary Color</label>
                    <ColorPicker onColorChange={handleColorChange('primary')} initialColor={theme.primary} />
                </div>
                <div className="theme-control-group">
                    <label>Secondary Color</label>
                    <ColorPicker onColorChange={handleColorChange('secondary')} initialColor={theme.secondary} />
                </div>
                <div className="theme-control-group">
                    <label>Accent Color</label>
                    <ColorPicker onColorChange={handleColorChange('accent')} initialColor={theme.accent} />
                </div>
            </div>
            <AuthProvider>
                <div className="auth-container">
                    <h1>Authentication Demo</h1>
                    <div className="forms-container">
                        <div className="form-section">
                            <h2>Login</h2>
                            <LoginForm
                                onSuccess={() => console.log('Login successful')}
                                onError={(error) => console.error(error)}
                            />
                        </div>
                        <div className="form-section">
                            <h2>Register</h2>
                            <RegisterForm
                                onSuccess={() => console.log('Registration successful')}
                                onError={(error) => console.error(error)}
                            />
                        </div>
                        <div className="form-section">
                            <h2>OTP Verification</h2>
                            <OTPVerification
                                phoneNumber="+1234567890"
                                onSuccess={() => console.log('OTP verification successful')}
                                onError={(error) => console.error(error)}
                            />
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </div>
    );
}
