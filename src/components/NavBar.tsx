import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

// Thanh điều hướng
export function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-xl font-bold text-[var(--text-primary)]">Crypto AI</span>
          </div>
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base transition-colors ${
                  isActive
                    ? 'bg-[var(--bg-hover)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              Tin tức
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base transition-colors ${
                  isActive
                    ? 'bg-[var(--bg-hover)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              AI Chatbot
            </NavLink>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
