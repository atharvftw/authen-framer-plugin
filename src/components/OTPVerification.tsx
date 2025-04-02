import React, { useState, useEffect } from 'react';
import { framer } from 'framer-plugin';

interface OTPVerificationProps {
  phoneNumber: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  config?: {
    buttonText?: string;
    resendButtonText?: string;
    otpLabel?: string;
    resendTimeout?: number;
    twilioConfig?: {
      accountSid: string;
      authToken: string;
      serviceSid: string;
    };
  };
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  phoneNumber,
  onSuccess,
  onError,
  config = {
    buttonText: 'Verify OTP',
    resendButtonText: 'Resend OTP',
    otpLabel: 'Enter OTP',
    resendTimeout: 60,
    twilioConfig: {
      accountSid: '',
      authToken: '',
      serviceSid: '',
    },
  },
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(config.resendTimeout || 60);

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev && prev <= 1) {
            setResendDisabled(false);
            clearInterval(timer);
            return config.resendTimeout || 60;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDisabled, config.resendTimeout]);

  const sendOTP = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock OTP sending for development
      console.log('Sending OTP to:', phoneNumber);
      // In production, implement actual Twilio integration
      
      setResendDisabled(true);
      setCountdown(config.resendTimeout || 60);
    } catch (err) {
      setError('Failed to send OTP');
      onError?.('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock OTP verification for development
      console.log('Verifying OTP:', otp);
      // In production, implement actual Twilio verification
      
      // For demo purposes, accept any 6-digit code
      if (otp.length === 6) {
        onSuccess?.();
      } else {
        setError('Invalid OTP');
        onError?.('Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed');
      onError?.('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="form-group">
        <label htmlFor="otp">{config.otpLabel}</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
          disabled={loading}
          className="otp-input"
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button
        type="button"
        onClick={verifyOTP}
        disabled={loading || otp.length !== 6}
      >
        {loading ? 'Verifying...' : config.buttonText}
      </button>
      <button
        type="button"
        onClick={sendOTP}
        disabled={loading || resendDisabled}
        className="resend-button"
      >
        {resendDisabled
          ? `Resend in ${countdown}s`
          : config.resendButtonText}
      </button>
    </div>
  );
}; 