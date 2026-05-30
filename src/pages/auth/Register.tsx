import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, fetchUserProfile } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types';
import EulerMark from '../../components/euler/EulerMark';
import PiboMascot from '../../components/mascot/PiboMascot';
import PageBackdrop from '../../components/layout/PageBackdrop';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [schoolName, setSchoolName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await registerUser(
        email,
        password,
        displayName,
        role,
        role === 'teacher' ? schoolName : undefined,
      );
      const profile = await fetchUserProfile(user.uid, user.email ?? '');
      useAuthStore.getState().setUserData(profile);
      navigate('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    'w-full rounded-xl border border-[var(--euler-border)] bg-[var(--euler-surface)] px-4 py-2.5 focus:border-[var(--euler-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--euler-primary-glow)]';

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <PageBackdrop />
      <div className="relative z-10 w-full max-w-md">
        <div className="euler-glass p-8 sm:p-10">
          <div className="mb-4 flex justify-center">
            <EulerMark height={44} />
          </div>
          <PiboMascot expression="cheering" size={72} className="mx-auto mb-4" />
          <h1 className="font-display mb-2 text-center text-2xl font-bold">Únete a EULER</h1>
          <p className="mb-6 text-center text-sm text-[var(--euler-muted)]">
            Practica matemáticas con ruta clara hacia tu prueba
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Nombre</label>
              <input required className={inputCls} value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Correo</label>
              <input type="email" required className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Contraseña</label>
              <input type="password" required minLength={6} className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Soy</label>
              <div className="grid grid-cols-2 gap-2">
                {(['student', 'teacher'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`rounded-xl border-2 py-2.5 text-sm font-semibold transition ${
                      role === r
                        ? 'border-[var(--euler-primary)] bg-[var(--euler-primary)] text-white'
                        : 'border-[var(--euler-border)]'
                    }`}
                    onClick={() => setRole(r)}
                  >
                    {r === 'student' ? 'Estudiante' : 'Docente'}
                  </button>
                ))}
              </div>
            </div>
            {role === 'teacher' && (
              <div>
                <label className="mb-1 block text-sm font-medium">Colegio / institución</label>
                <input required className={inputCls} value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
              </div>
            )}
            {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
              {loading ? 'Creando…' : 'Crear cuenta'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            <Link to="/login" className="font-semibold text-[var(--euler-primary)] hover:underline">
              Ya tengo cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
