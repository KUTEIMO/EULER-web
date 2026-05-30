import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser, fetchUserProfile } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import EulerMark from '../../components/euler/EulerMark';
import PiboMascot from '../../components/mascot/PiboMascot';
import PageBackdrop from '../../components/layout/PageBackdrop';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      const profile = await fetchUserProfile(user.uid, user.email ?? '');
      useAuthStore.getState().setUserData(profile);
      if (!profile?.onboardingComplete) {
        navigate('/onboarding');
      } else if (from) {
        navigate(from);
      } else {
        navigate(profile?.role === 'teacher' ? '/t/dashboard' : '/s/home');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <PageBackdrop />
      <div className="relative z-10 w-full max-w-md">
        <div className="euler-glass p-8 sm:p-10">
          <div className="mb-4 flex justify-center">
            <EulerMark height={44} />
          </div>
          <div className="mb-6 flex justify-center">
            <PiboMascot expression="happy" size={80} />
          </div>
          <h1 className="font-display mb-2 text-center text-2xl font-bold">Bienvenido de nuevo</h1>
          <p className="mb-6 text-center text-sm text-[var(--euler-muted)]">
            Sigue sumando XP hacia tu meta Saber 11
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Correo</label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-[var(--euler-border)] bg-[var(--euler-surface)] px-4 py-2.5 transition focus:border-[var(--euler-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--euler-primary-glow)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full rounded-xl border border-[var(--euler-border)] bg-[var(--euler-surface)] px-4 py-2.5 transition focus:border-[var(--euler-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--euler-primary-glow)]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-[var(--euler-muted)]">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-semibold text-[var(--euler-primary)] hover:underline">
              Regístrate gratis
            </Link>
          </p>
          <p className="mt-2 text-center">
            <Link to="/" className="text-sm text-[var(--euler-muted)] hover:underline">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
