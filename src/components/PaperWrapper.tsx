import { Paper } from '@mui/material';

interface PaperProps {
  children?: React.ReactNode;
  isSender: boolean;
  theme: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}

const PaperWrapper: React.FC<PaperProps> = ({ children, isSender, theme }) => {
  return (
    <Paper
      sx={{
        p: 2,
        maxWidth: '70%',
        backgroundColor: isSender ? theme.primaryColor || '#1976d2' : 'white',
        color: isSender ? 'white' : 'black',
      }}
    >
      {children}
    </Paper>
  );
};

export default PaperWrapper;
