import { useState } from 'react';
import { Link } from 'react-router-dom';
import { joinGroupByCode } from '../../services/groupService';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';

export default function StudentGroups() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userData } = useAuthStore();
  const { progress, setGroup } = useProgressStore();

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const group = await joinGroupByCode(code, userData?.displayName ?? progress.displayName);
      setGroup(group.id);
      window.location.href = `/s/groups/${group.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo unir');
    } finally {
      setLoading(false);
    }
  }

  const currentId = useProgressStore.getState().currentGroupId;

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="font-display text-3xl font-bold">Grupos de clase</h1>
      <p className="text-[var(--euler-muted)]">
        Pide el código de 6 caracteres a tu docente para unirte al ranking y chat.
      </p>
      <form onSubmit={handleJoin} className="euler-glass space-y-4 p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">Código del grupo</label>
          <input
            className="w-full rounded-xl border border-[var(--euler-border)] bg-transparent px-4 py-3 text-center text-lg tracking-widest uppercase"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={6}
            placeholder="ABC123"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Uniendo…' : 'Unirme'}
        </button>
      </form>
      {currentId && (
        <Link to={`/s/groups/${currentId}`} className="btn-secondary inline-flex">
          Ir a mi grupo actual
        </Link>
      )}
    </div>
  );
}
