import { Box, Typography } from '@mui/material';
import PaperWrapper from './PaperWrapper'; // Assuming you have a PaperWrapper component
import parse from 'html-react-parser';

const Message: React.FC<{
  key: string;
  message: any;
  theme: any;
}> = ({ key, message, theme }) => {
  return (
    <Box
      key={key}
      sx={{
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      <PaperWrapper isSender={message.sender === 'user'} theme={theme}>
        <Typography variant="body1">{parse(message.text)}</Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {message.timestamp.toLocaleTimeString()}
        </Typography>
      </PaperWrapper>
    </Box>
  );
};

export default Message;
