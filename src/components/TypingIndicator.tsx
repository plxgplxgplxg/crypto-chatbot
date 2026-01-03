// Typing indicator
export function TypingIndicator() {
  return (
    <div className="flex mb-4 animate-fade-in">
      <div className="px-4 py-3">
        <div className="flex gap-1">
          <span 
            className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" 
            style={{ animationDelay: '0ms' }}
          />
          <span 
            className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" 
            style={{ animationDelay: '150ms' }}
          />
          <span 
            className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" 
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
