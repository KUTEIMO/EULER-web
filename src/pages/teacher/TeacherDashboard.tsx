import { Link } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold">Panel docente</h1>
      <p className="text-[var(--euler-muted)]">
        Crea grupos para tus estudiantes y sigue el ranking en tiempo real.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/t/groups" className="euler-glass flex items-center gap-4 p-6 transition hover:border-euler-primary-light">
          <Users className="h-10 w-10 text-euler-primary-light" />
          <div>
            <h2 className="font-display font-semibold">Mis grupos</h2>
            <p className="text-sm text-[var(--euler-muted)]">Ver y crear clases</p>
          </div>
        </Link>
        <Link to="/t/groups/new" className="euler-glass flex items-center gap-4 p-6 transition hover:border-euler-coral">
          <Plus className="h-10 w-10 text-euler-coral" />
          <div>
            <h2 className="font-display font-semibold">Nuevo grupo</h2>
            <p className="text-sm text-[var(--euler-muted)]">Genera código para la clase</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
