import type { NewsResponse } from '../types/api';

const API_BASE = 'https://api-quant-data-layer-dev.nysm.work';

// Lấy tin tức
export async function fetchNews(page: number, pageSize: number): Promise<NewsResponse> {
  const now = Date.now();
  // Lấy tin tức từ 2 tháng trước đến hiện tại
  const twoMonthsAgo = now - (60 * 24 * 60 * 60 * 1000);
  const fromTime = twoMonthsAgo;
  const toTime = now;

  const response = await fetch(
    `${API_BASE}/api/news?page=${page}&pageSize=${pageSize}&fromTime=${fromTime}&toTime=${toTime}`
  );

  if (!response.ok) {
    throw new Error('Không thể tải tin tức. Vui lòng thử lại.');
  }

  return response.json();
}

// Gửi tin nhắn
export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_BASE}/api/chat-bot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Không thể gửi tin nhắn. Vui lòng thử lại.');
  }

  return response.text();
}
