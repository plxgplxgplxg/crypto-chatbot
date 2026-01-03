import { useState, useEffect, useCallback } from 'react';
import type { ChatMessage } from '../types/api';
import { sendChatMessage } from '../services/api';

const STORAGE_KEY = 'chatHistory';

// Serialize messages
export function serializeMessages(messages: ChatMessage[]): string {
  return JSON.stringify(messages);
}

// Deserialize messages
export function deserializeMessages(data: string): ChatMessage[] {
  const parsed = JSON.parse(data);
  return parsed.map((msg: ChatMessage) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));
}

// Validate tin nhắn rỗng
export function isEmptyMessage(content: string): boolean {
  return !content || content.trim().length === 0;
}

// Hook quản lý chat
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load messages
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMessages(deserializeMessages(saved));
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Lưu messages
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, serializeMessages(messages));
    }
  }, [messages]);

  // Gửi tin nhắn
  const sendMessage = useCallback(async (content: string) => {
    if (isEmptyMessage(content)) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(content.trim());

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa lịch sử
  const clearHistory = useCallback(() => {
    setMessages([]);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, loading, error, sendMessage, clearHistory };
}
