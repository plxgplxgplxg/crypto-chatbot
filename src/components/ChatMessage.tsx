import ReactMarkdown from 'react-markdown';
import type { ChatMessage as ChatMessageType } from '../types/api';
import { useTypingEffect } from '../hooks/useTypingEffect';

interface ChatMessageProps {
  message: ChatMessageType;
  isLatest?: boolean;
  enableTyping?: boolean;
  onTypingComplete?: () => void;
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
export function ChatMessage({ 
  message, 
  isLatest = false, 
  enableTyping = false,
  onTypingComplete 
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  const shouldType = !isUser && isLatest && enableTyping;

  const { displayedText, isTyping, isComplete } = useTypingEffect({
    text: message.content,
    enabled: shouldType,
  });

  // Callback khi typing hoàn thành
  if (isComplete && shouldType && onTypingComplete) {
    onTypingComplete();
  }

  const contentToShow = shouldType ? displayedText : message.content;

  // Thêm cursor vào cuối text trước khi render markdown
  const contentWithCursor = isTyping 
    ? contentToShow + '▋' 
    : contentToShow;

  return (
    <div 
      className={`flex mb-3 sm:mb-4 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[90%] sm:max-w-[80%] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl leading-relaxed ${
          isUser
            ? 'bg-[var(--user-bubble)] text-[var(--text-primary)] rounded-br-sm'
            : 'bg-transparent text-[var(--text-primary)]'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{message.content}</p>
        ) : (
          <div className={`prose prose-sm max-w-none text-[var(--text-primary)] prose-strong:text-[var(--text-primary)] prose-strong:font-semibold ${isTyping ? 'typing-cursor' : ''}`}>
            <ReactMarkdown>{formatMessage(contentWithCursor)}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
