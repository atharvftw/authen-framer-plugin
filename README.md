# Authen - Framer Authentication Plugin

A beautiful and customizable authentication plugin for Framer that provides ready-to-use components for user authentication flows.

![Authen Plugin Preview](preview.png)

## Features

- 🎨 Beautiful, customizable UI with theme support
- 🔐 Multiple authentication components:
  - Login Form
  - Registration Form
  - OTP Verification (with Twilio integration)
- 🎯 State management with Framer CMS
- 🌈 Customizable color schemes
- 📱 Responsive design
- 🔄 Smooth animations and transitions

## Installation

1. Clone this repository:
```bash
git clone https://github.com/atharvftw/authen-framer-plugin.git
```

2. Install dependencies:
```bash
cd authen-framer-plugin
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

### Basic Setup

1. Import the components in your Framer project:
```typescript
import { AuthProvider, LoginForm, RegisterForm, OTPVerification } from 'authen-framer-plugin';
```

2. Wrap your app with the AuthProvider:
```typescript
<AuthProvider>
  {/* Your app components */}
</AuthProvider>
```

### Components

#### LoginForm
```typescript
<LoginForm
  onSuccess={(user) => console.log('Login successful', user)}
  onError={(error) => console.error('Login failed', error)}
/>
```

#### RegisterForm
```typescript
<RegisterForm
  onSuccess={(user) => console.log('Registration successful', user)}
  onError={(error) => console.error('Registration failed', error)}
/>
```

#### OTPVerification
```typescript
<OTPVerification
  phoneNumber="+1234567890"
  onSuccess={() => console.log('OTP verified')}
  onError={(error) => console.error('OTP verification failed', error)}
/>
```

### Theme Customization

The plugin comes with a built-in theme system. You can customize colors using the ColorPicker component:

```typescript
import { ColorPicker } from 'authen-framer-plugin';

// In your component:
<ColorPicker
  onColorChange={(color) => {
    // Update your theme
    document.documentElement.style.setProperty('--primary-color', color);
  }}
  initialColor="#6366f1"
/>
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
VITE_TWILIO_ACCOUNT_SID=your_twilio_sid
VITE_TWILIO_AUTH_TOKEN=your_twilio_token
VITE_TWILIO_PHONE_NUMBER=your_twilio_phone
```

### Theme Variables

The plugin uses CSS variables for theming. You can customize these in your CSS:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  --background-color: #f8fafc;
  --text-color: #1e293b;
  --border-color: #e2e8f0;
  --success-color: #10b981;
  --error-color: #ef4444;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- [Framer](https://www.framer.com/) for the amazing platform
- [Twilio](https://www.twilio.com/) for OTP verification
- [React](https://reactjs.org/) for the component architecture
