import React, { useState, useRef, useEffect } from 'react';
import { AuthProvider } from './components/AuthProvider';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { OTPVerification } from './components/OTPVerification';
import { ColorPicker } from './components/ColorPicker';
import './styles/auth.css';

function App() {
    const [theme, setTheme] = useState({
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#f8fafc',
        text: '#1e293b'
    });

    // State for resizable container
    const [size, setSize] = useState({ width: 320, height: 568 }); // 16:9 aspect ratio
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Apply theme colors to CSS variables
    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--accent-color', theme.accent);
        document.documentElement.style.setProperty('--background-color', theme.background);
        document.documentElement.style.setProperty('--text-color', theme.text);
    }, [theme]);

    const handleColorChange = (color: string, type: keyof typeof theme) => {
        setTheme(prev => ({
            ...prev,
            [type]: color
        }));
    };

    // Handle mouse events for resizing
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const deltaX = e.clientX - dragStart.x;
            const deltaY = e.clientY - dragStart.y;
            
            setSize(prev => ({
                width: Math.max(300, prev.width + deltaX),
                height: Math.max(500, prev.height + deltaY)
            }));
            
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    return (
        <div className="app-wrapper">
            <div className="controls-panel">
                <h2>Authen Demo</h2>
                <div className="theme-controls">
                    <div className="theme-control-group">
                        <label>Primary Color</label>
                        <ColorPicker 
                            onColorChange={(color) => handleColorChange(color, 'primary')}
                            initialColor={theme.primary}
                        />
                    </div>
                    <div className="theme-control-group">
                        <label>Secondary Color</label>
                        <ColorPicker 
                            onColorChange={(color) => handleColorChange(color, 'secondary')}
                            initialColor={theme.secondary}
                        />
                    </div>
                    <div className="theme-control-group">
                        <label>Accent Color</label>
                        <ColorPicker 
                            onColorChange={(color) => handleColorChange(color, 'accent')}
                            initialColor={theme.accent}
                        />
                    </div>
                </div>
            </div>
            
            <div className="device-frame-container">
                <div 
                    className="device-frame"
                    ref={containerRef}
                    style={{ 
                        width: size.width + 'px',
                        height: size.height + 'px'
                    }}
                >
                    <div className="device-content">
                        <AuthProvider>
                            <div className="auth-container">
                                <h1>Authen</h1>
                                <div className="forms-container">
                                    <div className="form-section">
                                        <h2>Login</h2>
                                        <LoginForm 
                                            onSuccess={() => console.log('Login success')}
                                            onError={(error) => console.log('Login error:', error)}
                                        />
                                    </div>
                                    <div className="form-section">
                                        <h2>Register</h2>
                                        <RegisterForm
                                            onSuccess={() => console.log('Registration success')}
                                            onError={(error) => console.log('Registration error:', error)}
                                        />
                                    </div>
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
                    <div 
                        className="resize-handle"
                        onMouseDown={handleMouseDown}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M11 6l-6 6-6-6h12z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
