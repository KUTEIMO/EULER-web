import { clearCatalogCache, loadCatalog } from '../../services/courseService';
import { useThemeStore } from '../../store/themeStore';
import ApkDownloadCard from '../../components/ApkDownloadCard';

export default function StudentSettings() {
  const { theme, toggle } = useThemeStore();

  async function refreshCatalog() {
    clearCatalogCache();
    await loadCatalog(true);
    alert('Catálogo actualizado desde Firestore.');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="font-display text-3xl font-bold">Ajustes</h1>
      <div className="euler-glass space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span>Tema</span>
          <button type="button" className="btn-secondary" onClick={toggle}>
            {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          </button>
        </div>
        <button type="button" className="btn-secondary w-full" onClick={refreshCatalog}>
          Actualizar catálogo remoto
        </button>
      </div>
      <ApkDownloadCard />
      <p className="text-sm text-[var(--euler-muted)]">
        El progreso de lecciones se guarda en este navegador (Fase 1). Ver docs para sincronización
        en la nube.
      </p>
    </div>
  );
}
