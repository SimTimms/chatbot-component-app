import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Chatbot from "./components/Chatbot";
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Chatbot
        apiEndpoint="http://localhost:3001/api/chat/ask" // Replace with your API endpoint
        title="AI Assistant"
        theme={{
          primaryColor: "#1976d2",
          secondaryColor: "#f5f5f5",
        }}
        uuid={uuidv4()}
      />
    </ThemeProvider>
  );
}

export default App;
