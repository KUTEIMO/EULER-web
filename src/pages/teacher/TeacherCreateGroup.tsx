import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGroup } from '../../services/groupService';
import { useAuthStore } from '../../store/authStore';

export default function TeacherCreateGroup() {
  const { userData } = useAuthStore();
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState(userData?.schoolName ?? '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const group = await createGroup(name, schoolName);
      navigate(`/t/groups/${group.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear grupo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="font-display text-3xl font-bold">Nuevo grupo</h1>
      <form onSubmit={handleSubmit} className="euler-glass space-y-4 p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">Nombre del grupo</label>
          <input
            required
            className="w-full rounded-xl border border-[var(--euler-border)] bg-transparent px-4 py-2.5"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Colegio</label>
          <input
            required
            className="w-full rounded-xl border border-[var(--euler-border)] bg-transparent px-4 py-2.5"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creando…' : 'Crear y ver código'}
        </button>
      </form>
    </div>
  );
}
