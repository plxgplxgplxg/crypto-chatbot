import { useEffect, useRef } from 'react';
import { NavBar } from '../components/NavBar';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { TypingIndicator } from '../components/TypingIndicator';
import { useChat } from '../hooks/useChat';

// Trang chat
export function ChatPage() {
  const { messages, loading, error, sendMessage, clearHistory } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll xuống tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-primary)]">
      {/* Header với navigation */}
      <NavBar />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sub header - cùng max-width với vùng chat */}
        <div className="border-b border-[var(--border-color)]">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Chat với AI Crypto</h1>
            {messages.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Xóa lịch sử
              </button>
            )}
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.length === 0 && !loading && (
              <div className="text-center text-[var(--text-secondary)] py-20">
                <p className="text-xl mb-3">Chào mừng bạn đến với Crypto AI</p>
                <p className="text-base">Hãy hỏi tôi về phân tích thị trường crypto.</p>
              </div>
            )}

            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {loading && <TypingIndicator />}

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 animate-fade-in">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area - sticky bottom */}
        <div className="bg-[var(--bg-primary)]/80 backdrop-blur-sm border-t border-[var(--border-color)] p-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSend={sendMessage} disabled={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
