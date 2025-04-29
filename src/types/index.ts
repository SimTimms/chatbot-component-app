export type UserDetails = {
  name?: string;
  email?: string;
  invoiceNumber?: string;
};

export enum MessageInputType {
  MESSAGE = 'message',
  EMAIL = 'email',
  INVOICE = 'invoice',
}

export type MessageType = {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  escalate?: boolean; // Optional property to indicate escalation
};
