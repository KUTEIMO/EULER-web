# Ejecución y deploy — EULER Web

## Requisitos

- Node.js 20+
- Cuenta Firebase con proyecto `pefcmeem-633d9`
- Firebase CLI (`npm i -g firebase-tools`)

## Variables de entorno

Copia `.env.example` a `.env` y completa desde Firebase Console → Configuración del proyecto → Tu app **Web**.

## Desarrollo local

```bash
npm install
npm run dev
```

## Crear sitio Hosting (una vez)

```bash
firebase login
firebase use pefcmeem-633d9
firebase hosting:sites:create pefcmeem-euler-web
```

El sitio debe coincidir con `firebase.json` → `"site": "pefcmeem-euler-web"`.

## Producción

```bash
npm run build
firebase deploy --only hosting:pefcmeem-euler-web
```

## Notas

- La web Flutter sigue en el sitio `pefcmeem-633d9-e5f18` (PEFCMEEM-MOVIL).
- Este repo despliega solo la SPA React en `euler-web`.
- No subir `.env` ni claves de cuenta de servicio.
