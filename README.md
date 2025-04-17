# React Chatbot Component

A modern, customizable chatbot component for React applications that can be easily integrated into any website.

## Features

- Modern UI with Material-UI components
- Customizable theme and colors
- Real-time message updates
- Loading states
- Error handling
- Responsive design
- Support for API key authentication
- Timestamp for messages
- Auto-scrolling to latest messages

## Installation

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## Usage

```tsx
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Chatbot
      apiEndpoint="YOUR_API_ENDPOINT_HERE"
      apiKey="YOUR_API_KEY_HERE" // Optional
      title="AI Assistant"
      theme={{
        primaryColor: "#1976d2",
        secondaryColor: "#f5f5f5",
      }}
    />
  );
}
```

## Props

| Prop                 | Type   | Required | Description                                          |
| -------------------- | ------ | -------- | ---------------------------------------------------- |
| apiEndpoint          | string | Yes      | The endpoint URL for the chatbot API                 |
| apiKey               | string | No       | API key for authentication (if required)             |
| title                | string | No       | Title of the chatbot (default: 'Chat Assistant')     |
| theme                | object | No       | Custom theme colors                                  |
| theme.primaryColor   | string | No       | Primary color for the chatbot (default: '#1976d2')   |
| theme.secondaryColor | string | No       | Secondary color for the chatbot (default: '#f5f5f5') |

## API Integration

The component expects the API to:

1. Accept POST requests
2. Accept a JSON body with a `message` property
3. Return a JSON response with a `response` property

Example API response:

```json
{
  "response": "This is the AI's response"
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT
