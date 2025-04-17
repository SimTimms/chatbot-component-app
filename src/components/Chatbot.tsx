import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import parse from "html-react-parser";
interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  apiEndpoint: string;
  title?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
  uuid?: string; // Optional UUID prop
}

const Chatbot: React.FC<ChatbotProps> = ({
  apiEndpoint,
  title = "Chat Assistant",
  theme = {},
  uuid,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input, sessionId: uuid }),
      });

      const data = await response.json();
      console.log("Response data:", data); // Log the response data for debugging
      const botMessage: Message = {
        text: data.answer || "Sorry, I could not process your request.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        text: "Sorry, there was an error processing your request.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "600px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.secondaryColor || "#f5f5f5",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: theme.primaryColor || "#1976d2",
            color: "white",
          }}
        >
          <Typography variant="h6">{title}</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "70%",
                  backgroundColor:
                    message.sender === "user"
                      ? theme.primaryColor || "#1976d2"
                      : "white",
                  color: message.sender === "user" ? "white" : "black",
                }}
              >
                <Typography variant="body1">{parse(message.text)}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          ))}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <CircularProgress size={20} />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              multiline
              maxRows={4}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chatbot;
