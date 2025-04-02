import React from 'react';
import { framer } from 'framer-plugin';
import { AuthProvider } from './components/AuthProvider';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { OTPVerification } from './components/OTPVerification';
import './styles/auth.css';

// Define the plugin configuration type
interface PluginConfig {
  name: string;
  version: string;
  components: {
    [key: string]: React.ComponentType<any>;
  };
  panels: Array<{
    name: string;
    component: React.ComponentType;
  }>;
}

// Export the plugin configuration
export const AuthenPlugin: PluginConfig = {
  name: 'Authen',
  version: '1.0.0',
  components: {
    AuthProvider,
    LoginForm,
    RegisterForm,
    OTPVerification,
  },
  panels: [
    {
      name: 'Authentication',
      component: () => (
        <div className="authen-panel">
          <h2>Authentication Settings</h2>
          <p>Configure your authentication settings here.</p>
          <div className="settings-form">
            <div className="form-group">
              <label>Twilio Configuration</label>
              <input type="text" placeholder="Account SID" />
              <input type="text" placeholder="Auth Token" />
              <input type="text" placeholder="Service SID" />
            </div>
          </div>
        </div>
      ),
    },
  ],
}; 