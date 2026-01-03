import { useState, useEffect, useCallback } from 'react';
import type { NewsItem } from '../types/api';
import { fetchNews } from '../services/api';

// Hook quản lý news
export function useNews(page: number, pageSize: number) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchNews(page, pageSize);
      setNews(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return { news, total, loading, error, refetch: loadNews };
}
