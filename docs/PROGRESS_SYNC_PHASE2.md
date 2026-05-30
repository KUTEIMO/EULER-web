# Fase 2 — Sincronización de progreso en Firestore

## Estado actual (Fase 1)

- Progreso de lecciones, XP, racha y lecciones completadas: **`localStorage`** clave `pefcmeem_user_progress_v1`.
- Misma forma JSON que `UserProgress` en PEFCMEEM-MOVIL (`lib/core/models/user_progress.dart`).
- **No** se sincroniza entre navegador y app móvil.
- Ranking de grupo **sí** usa Firestore (`groups/{id}/members/{uid}.totalXp`).

## Objetivo Fase 2

Una cuenta = mismo avance en web y móvil.

## Esquema propuesto

Documento: `users/{uid}/learning_progress/default`

```json
{
  "totalXp": 0,
  "currentStreak": 0,
  "longestStreak": 0,
  "lastActivityDateIso": "2026-05-28",
  "completedLessonIds": ["alg_l1"],
  "totalQuestionsAnswered": 0,
  "totalQuestionsCorrect": 0,
  "studyMinutesApprox": 0,
  "displayName": "Estudiante",
  "gradeLabel": "10",
  "goalLabel": "Saber 11",
  "avatarColorIndex": 0,
  "updatedAt": "<serverTimestamp>"
}
```

## Reglas Firestore (borrador)

```javascript
match /users/{uid}/learning_progress/{docId} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
```

## Migración

1. **Web:** al iniciar sesión, leer Firestore; si no existe, subir `localStorage` y usar remoto como fuente de verdad.
2. **Móvil:** actualizar `ProgressStore` para leer/escribir el mismo documento (mantener caché local opcional).
3. **Conflicto:** ganar el documento con `updatedAt` más reciente; merge de `completedLessonIds` por unión de conjuntos.

## Tareas

- [ ] Añadir reglas en `PEFCMEEM-MOVIL/firestore.rules`
- [ ] `progressService.ts` en EULER-web con modo `remote`
- [ ] `ProgressStore` Dart con sync al login/logout
- [ ] Pruebas: completar lección en web → ver XP en móvil (misma cuenta)
