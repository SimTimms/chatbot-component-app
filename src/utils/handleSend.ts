import hasBeenEscalated from '../utils/hasBeenEscalated';
import { MessageInputType, MessageType } from '../types';

const handleSend = async (
  apiEndpoint: string,
  uuid: string,
  input: string,
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
  setMessageInputType: React.Dispatch<React.SetStateAction<MessageInputType>>,
  messageInputType: MessageInputType,
  userDetails: any,
  setUserDetails: React.Dispatch<React.SetStateAction<any>>,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let emailAddress = userDetails.emailAddress;
  if (!input.trim()) return;

  if (messageInputType !== MessageInputType.MESSAGE) {
    //handle information collection
    if (messageInputType === MessageInputType.EMAIL) {
      const emailMessage: MessageType = {
        text: `Thank you: ${input}. Please wait a moment for confirmation.`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setUserDetails((userDetails: any) => ({
        ...userDetails,
        emailAddress: input,
      }));
      emailAddress = input;
      setMessages((prev) => [...prev, emailMessage]);
      setMessageInputType(MessageInputType.MESSAGE);
      setInput('');
    }
  } else {
    const userMessage: MessageType = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
  }

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: input,
        emailAddress: emailAddress,
        sessionId: uuid,
      }),
    });

    const data = await response.json();
    const botMessage: MessageType = {
      text: data.answer || 'Sorry, I could not process your request.',
      sender: 'bot',
      timestamp: new Date(),
    };
    if (hasBeenEscalated(data.answer)) {
      const escalationMessage: MessageType = {
        text: 'No problem, I will escalate this to our support team. In order for us to process this request efficiently, please provide us with an email address:',
        sender: 'bot',
        timestamp: new Date(),
        escalate: true,
      };
      setMessageInputType(MessageInputType.EMAIL);

      return setMessages((prev) => [...prev, escalationMessage]);
    }
    setUserDetails((userDetails: any) => ({
      ...userDetails,
      emailAddress: '',
    }));
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error('Error:', error);
    const errorMessage: MessageType = {
      text: 'Sorry, there was an error processing your request.',
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};

export default handleSend;
