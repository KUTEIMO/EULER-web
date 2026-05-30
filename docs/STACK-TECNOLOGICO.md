# Stack tecnológico — EULER Web

| Capa | Tecnología |
|------|------------|
| UI | React 19, TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS 3 + tokens CSS `--euler-*` |
| Routing | React Router 6 |
| Estado | Zustand (auth, progress, theme, Pibo) |
| Backend | Firebase Auth + Firestore |
| Hosting | Firebase Hosting (sitio `euler-web`) |
| Iconos | Lucide React |

## Estructura

```text
src/
  config/       firebase.ts, branding.ts
  services/     auth, courses, groups, progress, gamification
  store/        authStore, progressStore, themeStore, piboStore
  components/   layout, mascot, lesson, euler
  pages/        Landing, auth, student/*, teacher/*
public/
  branding/     SVG Euler
  courses.json  fallback catálogo
```

## Firebase (compartido con PEFCMEEM-MOVIL)

- Proyecto: `pefcmeem-633d9`
- Colecciones: `users`, `groups`, `groups/{id}/members`, `groups/{id}/messages`, `published/courses`
