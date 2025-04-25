import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Chatbot from './components/Chatbot';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const sessionId = uuidv4();
console.log('SESSION', sessionId);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Chatbot
        apiEndpoint={import.meta.env.VITE_API_URL}
        title="AI Assistant"
        theme={{
          primaryColor: '#1976d2',
          secondaryColor: '#f5f5f5',
        }}
        uuid={sessionId}
      />
      <small className="session-id">
        <b>Session ID:</b> {sessionId}
      </small>
    </ThemeProvider>
  );
}

export default App;
