import { Link } from 'react-router-dom';
import { Flame, LogOut, Moon, Star, Sun, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';
import { useThemeStore } from '../../store/themeStore';
import { Gamification } from '../../services/gamification';
import { logoutUser } from '../../services/authService';
import EulerMark from '../euler/EulerMark';
import XpBar from '../gamification/XpBar';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { userData } = useAuthStore();
  const { progress } = useProgressStore();
  const { theme, toggle } = useThemeStore();
  const level = Gamification.levelFromTotalXp(progress.totalXp);
  const xpIn = Gamification.xpIntoCurrentLevel(progress.totalXp);
  const xpNeed = Gamification.xpForNextLevel(progress.totalXp);

  const home = userData?.role === 'teacher' ? '/t/dashboard' : '/s/home';

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--euler-border)] bg-[var(--euler-glass)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-[var(--euler-border)] lg:hidden"
              onClick={onMenuClick}
              aria-label="Abrir menú"
            >
              <span className="text-xl leading-none">☰</span>
            </button>
          )}
          <Link to={home} className="flex items-center gap-2">
            <EulerMark height={28} />
            <span className="font-display text-lg font-bold euler-gradient-text">EULER</span>
          </Link>
        </div>

        {userData?.role === 'student' && (
          <div className="hidden max-w-xs flex-1 md:block lg:max-w-sm">
            <XpBar current={xpIn} max={xpIn + xpNeed} label={`Nivel ${level}`} />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="stat-badge stat-badge-xp">
            <Star className="h-4 w-4 text-amber-500" aria-hidden />
            {progress.totalXp} XP
          </span>
          {userData?.role === 'student' && (
            <>
              <span className="stat-badge hidden sm:inline-flex">Nv. {level}</span>
              <span className="stat-badge stat-badge-streak hidden md:inline-flex">
                <Flame className="h-4 w-4 text-orange-500" aria-hidden />
                {progress.currentStreak}d
              </span>
            </>
          )}
          <button
            type="button"
            className="rounded-lg p-2 transition hover:bg-[var(--euler-border)]"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <span className="hidden items-center gap-1 text-sm sm:flex">
            <User className="h-4 w-4 text-[var(--euler-muted)]" aria-hidden />
            <span className="max-w-[8rem] truncate">{userData?.displayName}</span>
          </span>
          <button type="button" className="btn-secondary py-2 text-sm" onClick={() => logoutUser()}>
            <LogOut className="h-4 w-4" />
            <span className="hidden xs:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
