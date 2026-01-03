import { useState } from 'react';
import type { FormEvent } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Tính tổng trang
export function calculateTotalPages(total: number, pageSize: number): number {
  if (pageSize <= 0) return 0;
  return Math.ceil(total / pageSize);
}

// Phân trang
export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [inputPage, setInputPage] = useState('');
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleGoToPage = (e: FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(inputPage, 10);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setInputPage('');
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 py-4 sm:py-6">
      {/* Nút điều hướng */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg text-sm sm:text-base
            disabled:opacity-50 disabled:cursor-not-allowed 
            hover:bg-[var(--bg-hover)] transition-colors
            border border-[var(--border-color)]"
        >
          Trước
        </button>
        <span className="text-[var(--text-secondary)] text-sm sm:text-base">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg text-sm sm:text-base
            disabled:opacity-50 disabled:cursor-not-allowed 
            hover:bg-[var(--bg-hover)] transition-colors
            border border-[var(--border-color)]"
        >
          Sau
        </button>
      </div>

      {/* Nhập số trang */}
      <form onSubmit={handleGoToPage} className="flex items-center gap-2 sm:gap-3">
        <span className="text-[var(--text-secondary)] text-sm sm:text-base hidden sm:inline">Đi đến:</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          placeholder={String(currentPage)}
          className="w-16 sm:w-20 px-2 sm:px-3 py-1.5 sm:py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] 
            rounded-lg border border-[var(--border-color)] text-center text-sm sm:text-base
            focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50"
        />
        <button
          type="submit"
          disabled={!inputPage || parseInt(inputPage, 10) < 1 || parseInt(inputPage, 10) > totalPages}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg text-sm sm:text-base
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-[var(--bg-hover)] transition-colors
            border border-[var(--border-color)]"
        >
          Đi
        </button>
      </form>
    </div>
  );
}
