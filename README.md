# Integración de Cloud Computing en una aplicación frontend con React

Como desarrollador senior de frontend con experiencia en React y conocimientos avanzados en Ionic, tu misión es integrar los fundamentos de Cloud Computing en una aplicación frontend. Esto incluye comprender cómo los servicios en la nube pueden mejorar la funcionalidad y el rendimiento de la aplicación. Los actores clave en este dominio son el 'usuario final', 'servicio de autenticación en la nube', 'API de almacenamiento en la nube', y'servicio de notificaciones push'. La aplicación debe manejar un volumen de 10 000 solicitudes por minuto durante horas pico, con una latencia máxima de 200ms para respuestas críticas. El sistema debe ser idempotente en la gestión de sesiones de usuario, asegurando que múltiples inicios de sesión con las mismas credenciales no resulten en múltiples sesiones activas.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | fundamentos de cloud computing |
| **Nivel** | senior-l2 |
| **Tipo** | mixed |
| **Tiempo estimado** | 15 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Exploración de servicios en la nube relevantes

**Objetivo:** Identificar y evaluar servicios en la nube que pueden mejorar la funcionalidad de la aplicación frontend.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Investiga y documenta al menos tres servicios en la nube que podrían integrarse con una aplicación frontend construida con React y Ionic.
- Evalúa cada servicio en términos de su beneficio para la aplicación, considerando factores como latencia, costo, y facilidad de integración.

**Entregable:** Documento de evaluación de servicios en la nube con pros y contras de cada opción.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo cada servicio podría impactar la experiencia del usuario final.
- Piensa en cómo la integración de estos servicios podría afectar la arquitectura existente de la aplicación.

</details>

### Fase 2: Diseño de la integración de servicios en la nube

**Objetivo:** Diseñar la integración de los servicios en la nube seleccionados en la aplicación frontend.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Basado en la evaluación de la fase anterior, selecciona un servicio en la nube para integrar en la aplicación.
- Diseña la arquitectura necesaria para incorporar este servicio, considerando aspectos como la seguridad, la latencia, y la escalabilidad.
- Documenta tu diseño, incluyendo diagramas y descripciones detalladas.

**Entregable:** Documento de diseño de la integración de servicios en la nube.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejarás la autenticación y autorización con el servicio en la nube.
- Piensa en cómo asegurarás que la integración no afecte negativamente la experiencia del usuario.

</details>

### Fase 3: Implementación y validación de la integración

**Objetivo:** Implementar la integración diseñada y validar su funcionamiento en la aplicación frontend.

**Tiempo estimado:** 7 horas

**Instrucciones:**

- Implementa la integración del servicio en la nube seleccionado en la aplicación frontend.
- Realiza pruebas para validar que la integración funciona como se esperaba, considerando aspectos como la latencia, la escalabilidad, y la seguridad.
- Documenta los resultados de tus pruebas y cualquier ajuste realizado.

**Entregable:** Aplicación frontend con la integración de servicios en la nube implementada y documentada.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza herramientas de monitoreo para evaluar el rendimiento de la aplicación después de la integración.
- Considera cómo podrías optimizar la integración para mejorar aún más el rendimiento.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es Cloud Computing y cómo se relaciona con la capa frontend?
- **paraQueSirve**: ¿Para qué sirve integrar servicios en la nube en una aplicación frontend?
- **comoSeUsa**: ¿Cómo se usa un servicio en la nube en una aplicación frontend construida con React y Ionic?
- **erroresComunes**: ¿Cuáles son los errores comunes al integrar servicios en la nube en una aplicación frontend?
- **queDecisionesImplica**: ¿Qué decisiones implica la integración de servicios en la nube en una aplicación frontend?

## Criterios de Evaluacion

- Identificación y evaluación de servicios en la nube relevantes.
- Diseño de la integración de servicios en la nube en la aplicación frontend.
- Implementación y validación de la integración en la aplicación frontend.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
