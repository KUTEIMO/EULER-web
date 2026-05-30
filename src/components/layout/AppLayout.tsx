import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Header from './Header';
import Sidebar from './Sidebar';
import PageBackdrop from './PageBackdrop';
import Pibo from '../mascot/Pibo';

export default function AppLayout() {
  const { userData } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = userData?.role ?? 'student';

  return (
    <div className="relative min-h-screen">
      <PageBackdrop />
      <div className="relative z-10">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="mx-auto flex max-w-7xl">
          <Sidebar role={role} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="min-h-[calc(100vh-4rem)] flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
        {role === 'student' && <Pibo expression="happy" />}
      </div>
    </div>
  );
}
