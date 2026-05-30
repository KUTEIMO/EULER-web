# UX e identidad visual — EULER Web

## Objetivo del producto (psicología + pedagogía)

1. **Atraer:** landing cálida, Pibo visible, mensaje Saber 11/ICFES claro.
2. **Ayudar:** lecciones cortas, feedback inmediato, Pibo con tips sin presión.
3. **Mejorar:** XP, rachas, ranking de grupo — refuerzo positivo medible.

## Paleta (más suave que el azul oscuro inicial)

| Token | Claro | Oscuro |
|-------|-------|--------|
| Fondo | `#f3f7f6` sage | `#141c1e` grafito-verde |
| Primario | `#2a6f6a` | `#4db8ad` |
| Acento motivación | coral + gold (ICFES) | igual |

## Mascota Pibo

- SVG en `PiboMascot.tsx` (expresiones: normal, happy, cheering, thoughtful, sad).
- Chip **π** en el pecho, orejas suaves, animación flotante.
- Burbuja de diálogo en dock flotante (patrón LOGIKA).

## Gamificación visible

- Barra XP en header (estudiante).
- Tarjetas de estadísticas con acentos (nivel, XP, racha).
- Banner ICFES / meta del usuario.
- Reto del día en home.
- Celebración al completar lección.

## Referencia LOGIKA aplicada

- Estrellas/orbes de fondo (`PageBackdrop`, `euler-stars`).
- Glass cards con borde y sombra.
- Títulos con gradiente (`euler-gradient-text`).
- Mascota con personalidad, no solo icono genérico.

## Fase 2 visual (opcional)

- Sonidos UI (acierto / nivel).
- Insignias SVG por hitos Saber 11.
- Modo “simulacro” cronometrado.
