import { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

// Input chat
export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex items-center bg-[var(--input-bg)] rounded-2xl border border-[var(--input-border)]">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-[var(--text-primary)] 
            px-4 py-3 resize-none 
            focus:outline-none
            rounded-2xl
            placeholder:text-[var(--text-secondary)]
            disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="mr-2 p-2 rounded-lg
            bg-[var(--accent-color)] text-white
            hover:bg-[var(--accent-color)]/80
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-[var(--text-secondary)] text-center mt-2">
        Enter để gửi, Shift+Enter để xuống dòng
      </p>
    </form>
  );
}
