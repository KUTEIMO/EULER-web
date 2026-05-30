import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  Home,
  LayoutDashboard,
  Route,
  Settings,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import type { UserRole } from '../../types';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

const studentLinks = [
  { to: '/s/home', label: 'Inicio', icon: Home },
  { to: '/s/path', label: 'Mi ruta', icon: Route },
  { to: '/s/ranking', label: 'Estadísticas', icon: Trophy },
  { to: '/s/groups', label: 'Grupos', icon: Users },
  { to: '/s/settings', label: 'Ajustes', icon: Settings },
];

const teacherLinks = [
  { to: '/t/dashboard', label: 'Panel', icon: LayoutDashboard },
  { to: '/t/groups', label: 'Mis grupos', icon: Users },
  { to: '/s/settings', label: 'Ajustes', icon: Settings },
];

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const links = role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-label="Cerrar menú"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[var(--euler-border)] bg-[var(--euler-bg)] pt-16 transition-transform lg:static lg:z-0 lg:translate-x-0 lg:pt-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          className="absolute right-3 top-3 rounded-lg p-2 lg:hidden"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
        <nav className="flex flex-col gap-1 p-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[var(--euler-primary)] to-[var(--euler-primary-light)] text-white shadow-md'
                    : 'text-[var(--euler-muted)] hover:bg-[var(--euler-glass)]'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
          {role === 'student' && (
            <NavLink
              to="/about"
              onClick={onClose}
              className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[var(--euler-muted)] hover:bg-[var(--euler-glass)]"
            >
              <BookOpen className="h-5 w-5" />
              Sobre EULER
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
}
