import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setOnboardingComplete, updateProfileFields } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import PiboMascot from '../components/mascot/PiboMascot';
import PageBackdrop from '../components/layout/PageBackdrop';

const GRADES = ['9', '10', '11'];
const GOALS = [
  { id: 'Saber 9', label: 'Saber 9', desc: 'Primera prueba estandarizada' },
  { id: 'Saber 11', label: 'Saber 11 / ICFES', desc: 'Preparación universidad y becas' },
  { id: 'ICFES', label: 'Refuerzo ICFES', desc: 'Subir puntaje en matemáticas' },
  { id: 'Refuerzo general', label: 'Refuerzo escolar', desc: 'Mejorar notas en el colegio' },
];

export default function Onboarding() {
  const { currentUser, userData, setUserData } = useAuthStore();
  const { progress, updateProgress } = useProgressStore();
  const [grade, setGrade] = useState(progress.gradeLabel);
  const [goal, setGoal] = useState(progress.goalLabel);
  const navigate = useNavigate();

  async function handleContinue() {
    if (!currentUser) return;
    updateProgress({
      gradeLabel: grade,
      goalLabel: goal,
      displayName: userData?.displayName ?? progress.displayName,
    });
    await updateProfileFields(currentUser.uid, {
      displayName: userData?.displayName,
    });
    await setOnboardingComplete(currentUser.uid);
    setUserData(userData ? { ...userData, onboardingComplete: true } : null);
    navigate(userData?.role === 'teacher' ? '/t/dashboard' : '/s/home');
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <PageBackdrop />
      <div className="relative z-10 w-full max-w-lg">
        <div className="euler-glass p-8 sm:p-10">
          <div className="mb-6 flex flex-col items-center text-center">
            <PiboMascot expression="cheering" size={100} />
            <h1 className="font-display mt-4 text-2xl font-bold">Personaliza tu camino</h1>
            <p className="mt-2 text-sm text-[var(--euler-muted)]">
              EULER adapta el mensaje motivacional a tu grado y tu meta de prueba.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold">¿En qué grado estás?</label>
              <div className="grid grid-cols-3 gap-2">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`rounded-xl border-2 py-3 font-display text-lg font-bold transition ${
                      grade === g
                        ? 'border-[var(--euler-primary)] bg-[var(--euler-primary)] text-white'
                        : 'border-[var(--euler-border)] hover:border-[var(--euler-primary-light)]'
                    }`}
                    onClick={() => setGrade(g)}
                  >
                    {g}°
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">¿Cuál es tu meta principal?</label>
              <div className="space-y-2">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={`w-full rounded-xl border-2 px-4 py-3 text-left transition ${
                      goal === g.id
                        ? 'border-[var(--euler-coral)] bg-[var(--euler-coral)]/10'
                        : 'border-[var(--euler-border)] hover:border-[var(--euler-primary-light)]'
                    }`}
                    onClick={() => setGoal(g.id)}
                  >
                    <span className="font-semibold">{g.label}</span>
                    <span className="mt-0.5 block text-xs text-[var(--euler-muted)]">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="btn-primary w-full py-3 text-base" onClick={handleContinue}>
              ¡Vamos a practicar!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
