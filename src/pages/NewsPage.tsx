import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { NewsCard } from '../components/NewsCard';
import { Pagination, calculateTotalPages } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useNews } from '../hooks/useNews';

// Trang tin tức
export function NewsPage() {
  const [page, setPage] = useState(1);
  const displaySize = 9;
  // Lấy nhiều hơn để bù cho tin trùng
  const fetchSize = 18;
  const { news, total, loading, error } = useNews(page, fetchSize);
  
  // Lọc tin trùng theo title và chỉ lấy 9 tin
  const uniqueNews = news
    .filter((item, index, self) => index === self.findIndex((n) => n.title === item.title))
    .slice(0, displaySize);
  
  // Tính tổng trang dựa trên displaySize
  const totalPages = calculateTotalPages(total, displaySize);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <NavBar />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4 sm:mb-8">
          Tin tức Crypto mới nhất
        </h1>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {uniqueNews.map((item, index) => (
                <NewsCard key={`${item.id}-${index}`} news={item} />
              ))}
            </div>

            {totalPages > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
