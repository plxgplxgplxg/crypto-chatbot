import type { NewsItem } from '../types/api';

// Map sentiment -> màu
export function getSentimentColor(sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'): string {
  const colors = {
    POSITIVE: 'text-green-500 bg-green-500/10',
    NEGATIVE: 'text-red-500 bg-red-500/10',
    NEUTRAL: 'text-[var(--text-secondary)] bg-[var(--bg-hover)]',
  };
  return colors[sentiment];
}

interface NewsCardProps {
  news: NewsItem;
}

// Card tin tức
export function NewsCard({ news }: NewsCardProps) {
  const formattedDate = new Date(news.publishedOn * 1000).toLocaleString('vi-VN');

  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[var(--bg-secondary)] rounded-xl overflow-hidden 
        hover:bg-[var(--bg-tertiary)] transition-colors 
        border border-[var(--border-color)] hover:border-[var(--text-secondary)]"
    >
      <div className="aspect-video bg-[var(--bg-tertiary)] overflow-hidden">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=No+Image';
          }}
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-[var(--text-primary)] font-semibold text-sm sm:text-base line-clamp-2 mb-1.5 sm:mb-2">
          {news.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm mb-2 sm:mb-3">
          {news.authors} - {news.sourceName}
        </p>
        <div className="flex items-center justify-between">
          <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-medium ${getSentimentColor(news.sentiment)}`}>
            {news.sentiment}
          </span>
          <time className="text-[var(--text-secondary)] text-xs sm:text-sm">{formattedDate}</time>
        </div>
      </div>
    </a>
  );
}
