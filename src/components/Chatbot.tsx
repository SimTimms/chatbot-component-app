import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import handleSend from '../utils/handleSend';
import { MessageInputType, MessageType } from '../types';

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
  title = 'Chat Assistant',
  theme = {},
  uuid,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userDetails, setUserDetails] = useState({
    emailAddress: '',
    invoiceNumber: '',
  });

  const [messageInputType, setMessageInputType] = useState<MessageInputType>(
    MessageInputType.MESSAGE
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(
        apiEndpoint,
        uuid || '',
        input,
        setMessages,
        setMessageInputType,
        messageInputType,
        userDetails,
        setUserDetails,
        setInput,
        setIsLoading
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper
        elevation={3}
        sx={{
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.secondaryColor || '#f5f5f5',
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: theme.primaryColor || '#1976d2',
            color: 'white',
          }}
        >
          <Typography variant="h6">{title}</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message, index) => {
            return (
              <>
                <Message key={`${index}`} message={message} theme={theme} />
              </>
            );
          })}

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CircularProgress size={20} />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>
        <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
              onClick={() =>
                handleSend(
                  apiEndpoint,
                  uuid || '',
                  input,
                  setMessages,
                  setMessageInputType,
                  messageInputType,
                  userDetails,
                  setUserDetails,
                  setInput,
                  setIsLoading
                )
              }
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
