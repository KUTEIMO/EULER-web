# EULER Web

Sitio web propio para **EULER** (PEFCMEEM): matemáticas para Educación Media, con identidad visual dedicada y la misma base **Firebase** (`pefcmeem-633d9`) que la app móvil Flutter.

**No es** el build Flutter web: es una SPA **React + Vite + TypeScript + Tailwind**.

| Entorno | URL |
|---------|-----|
| Producción | https://pefcmeem-euler-web.web.app |
| App móvil / Flutter web (legacy) | https://pefcmeem-633d9-e5f18.web.app |
| APK Android | [releases/app-release.apk](https://github.com/KUTEIMO/PEFCMEEM-MOVIL/raw/main/releases/app-release.apk) |

---

## Inicio rápido

```bash
git clone https://github.com/KUTEIMO/EULER-web.git
cd EULER-web
npm install
cp .env.example .env
# Completar VITE_FIREBASE_* desde Firebase Console (app web pefcmeem-633d9)
npm run dev
```

Abrir `http://localhost:5173`.

---

## Funcionalidades

- Landing marketing full-bleed (marca EULER + Pibo)
- Auth email/contraseña, roles estudiante y docente
- Rutas de lecciones (teoría + ejercicios + XP)
- Progreso en `localStorage` (clave `pefcmeem_user_progress_v1`, compatible con la app)
- Grupos: código de clase, ranking y chat en Firestore
- Panel docente: crear grupos y ver ranking
- Tema claro/oscuro, catálogo remoto `published/courses`

---

## Documentación

| Archivo | Contenido |
|---------|-----------|
| [docs/STACK-TECNOLOGICO.md](docs/STACK-TECNOLOGICO.md) | Stack y estructura |
| [docs/EJECUCION-Y-DEPLOY.md](docs/EJECUCION-Y-DEPLOY.md) | Deploy Firebase Hosting |
| [docs/PROGRESS_SYNC_PHASE2.md](docs/PROGRESS_SYNC_PHASE2.md) | Plan sincronización progreso en Firestore |

---

## Deploy

```bash
npm run build
firebase deploy --only hosting:pefcmeem-euler-web
```

Repositorio hermano móvil: [PEFCMEEM-MOVIL](https://github.com/KUTEIMO/PEFCMEEM-MOVIL).
