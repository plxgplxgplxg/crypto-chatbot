import type { ChatMessage as ChatMessageType } from '../types/api';

interface ChatMessageProps {
  message: ChatMessageType;
}

// Tin nhắn chat
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div 
      className={`flex mb-4 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl leading-relaxed ${
          isUser
            ? 'bg-[var(--user-bubble)] text-[var(--text-primary)] rounded-br-sm'
            : 'bg-transparent text-[var(--text-primary)]'
        }`}
      >
        <p className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}
