# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Integración de Cloud Computing en una aplicación frontend con React**.

| | |
|---|---|
| Tema | fundamentos de cloud computing |
| Nivel | senior-l2 |
| Chapter | Frontend |
| Especialidad | React |
| Stack | TypeScript 5.7 / React 19 |
| Patron arquitectonico | capas estándar con servicios de nube desacoplados |
| Tiempo estimado | 15 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, vite.config.ts y tsconfig.json en la raiz`
- `src/main.tsx como entry point`
- `src/app con el arbol de rutas`
- `src/features con componentes contenedores y sus hooks`
- `src/shared con componentes presentacionales`
- `src/services con los clientes HTTP`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET. `@types/react-router-dom` ya no se publica para v6+, React Router trae sus tipos.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.

Dependencias:

- react 19.0.0-rc.0
- react-dom 19.0.0-rc.0
- @types/react 18.3.3
- @types/react-dom 18.3.0
- typescript 5.7.0-dev.20240710
- vite 5.3.1
- @vitejs/plugin-react 4.3.1
- eslint 8.57.0
- eslint-plugin-react 7.34.2
- eslint-plugin-react-hooks 4.6.2
- @tanstack/react-query 5.40.0
- axios 1.7.2
- react-router-dom 6.23.1
- zustand 4.5.2
- @aws-sdk/client-cognito-identity-provider 3.577.0
- @aws-sdk/client-s3 3.577.0
- firebase 10.12.2
- vitest 1.6.0
- @testing-library/react 15.0.7

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Exploración de servicios en la nube relevantes**: Documento de evaluación de servicios en la nube con pros y contras de cada opción.
- **Fase 2 — Diseño de la integración de servicios en la nube**: Documento de diseño de la integración de servicios en la nube.
- **Fase 3 — Implementación y validación de la integración**: Aplicación frontend con la integración de servicios en la nube implementada y documentada.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `src/services/authService.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/features/auth/AuthFeature.tsx` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Referencias colgando (8)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/services/notificationService.ts` — `NotificationPayload.close`
      Se invoca `close` sobre `NotificationPayload`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/utils/errorHandler.ts` — `ErrorSeverity.toUpperCase`
      Se invoca `toUpperCase` sobre `ErrorSeverity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/utils/errorHandler.ts` — `CloudError.push`
      Se invoca `push` sobre `CloudError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/utils/errorHandler.ts` — `CloudError.shift`
      Se invoca `shift` sobre `CloudError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/utils/errorHandler.ts` — `ErrorHandlerCallback.forEach`
      Se invoca `forEach` sobre `ErrorHandlerCallback`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/utils/errorHandler.ts` — `ErrorHandlerCallback.push`
      Se invoca `push` sobre `ErrorHandlerCallback`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/utils/errorHandler.ts` — `ErrorHandlerCallback.filter`
      Se invoca `filter` sobre `ErrorHandlerCallback`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `package.json` — `typescript@5.7.0-dev.20240710`
      typescript declara la version 5.7.0-dev.20240710, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (18)

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/services/authService.ts`
- `src/services/storageService.ts`
- `src/services/notificationService.ts`
- `src/features/auth/AuthFeature.tsx`
- `src/features/storage/StorageFeature.tsx`
- `src/features/notifications/NotificationsFeature.tsx`
- `src/types/cloudServices.d.ts`
- `src/shared/components/CloudServiceCard.tsx`
- `src/hooks/useCloudServices.ts`
- `src/config/cloudConfig.ts`
- `src/utils/errorHandler.ts`
- `public/index.html`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/app`
- `src/features`
- `src/shared`
- `src/services`
- `src/hooks`
- `src/types`
- `src/utils`
- `src/config`
- `public`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar con servicios de nube desacoplados**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Senior
- Brecha que el reto ataca: Aplica aspectos fundamentales de Cloud Computing y cómo se relaciona con la capa frontend. Puede participar activamente en las definiciones de un proyecto cloud.
- Mision: Candidato con experiencia Senior en Frontend con React, con conocimientos avanzados en Ionic.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
