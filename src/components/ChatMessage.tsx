import ReactMarkdown from 'react-markdown';
import type { ChatMessage as ChatMessageType } from '../types/api';

interface ChatMessageProps {
  message: ChatMessageType;
}

// Format message để hiển thị đúng markdown
function formatMessage(content: string): string {
  let formatted = content;
  
  // Thêm xuống dòng trước số thứ tự (1. hoặc 1))
  formatted = formatted.replace(/\s{2,}(\d{1,2}[\)\.]\s+[A-Za-zÀ-ỹ])/g, '\n\n$1');
  
  // Thêm xuống dòng trước gạch đầu dòng
  formatted = formatted.replace(/\s{2,}(-\s+[A-Za-zÀ-ỹ])/g, '\n  $1');
  
  // Chuyển 1) thành 1.
  formatted = formatted.replace(/^(\d{1,2})\)/gm, '$1.');
  formatted = formatted.replace(/\n(\d{1,2})\)/g, '\n$1.');
  
  return formatted.trim();
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
        {isUser ? (
          <p className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none text-[var(--text-primary)] prose-strong:text-[var(--text-primary)] prose-strong:font-semibold">
            <ReactMarkdown>{formatMessage(message.content)}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
