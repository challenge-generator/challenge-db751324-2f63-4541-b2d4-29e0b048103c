# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/services/authService.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/features/auth/AuthFeature.tsx` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/services/notificationService.ts` — `NotificationPayload.close`: Se invoca `close` sobre `NotificationPayload`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/utils/errorHandler.ts` — `ErrorSeverity.toUpperCase`: Se invoca `toUpperCase` sobre `ErrorSeverity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/utils/errorHandler.ts` — `CloudError.push`: Se invoca `push` sobre `CloudError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/utils/errorHandler.ts` — `CloudError.shift`: Se invoca `shift` sobre `CloudError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/utils/errorHandler.ts` — `ErrorHandlerCallback.forEach`: Se invoca `forEach` sobre `ErrorHandlerCallback`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/utils/errorHandler.ts` — `ErrorHandlerCallback.push`: Se invoca `push` sobre `ErrorHandlerCallback`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/utils/errorHandler.ts` — `ErrorHandlerCallback.filter`: Se invoca `filter` sobre `ErrorHandlerCallback`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.7.0-dev.20240710`: typescript declara la version 5.7.0-dev.20240710, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Senior

### Brecha de conocimiento
Aplica aspectos fundamentales de Cloud Computing y cómo se relaciona con la capa frontend. Puede participar activamente en las definiciones de un proyecto cloud.

### Misión / candidato
Candidato con experiencia Senior en Frontend con React, con conocimientos avanzados en Ionic.

### Reto
- Tema: fundamentos de cloud computing
- Seniority: senior-l2
- Tipo: mixed
- Título: Integración de Cloud Computing en una aplicación frontend con React
- Tiempo estimado: 15 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Exploración de servicios en la nube relevantes — objetivo: Identificar y evaluar servicios en la nube que pueden mejorar la funcionalidad de la aplicación frontend. — entregable (NO resolver): Documento de evaluación de servicios en la nube con pros y contras de cada opción.
- Fase 2: Diseño de la integración de servicios en la nube — objetivo: Diseñar la integración de los servicios en la nube seleccionados en la aplicación frontend. — entregable (NO resolver): Documento de diseño de la integración de servicios en la nube.
- Fase 3: Implementación y validación de la integración — objetivo: Implementar la integración diseñada y validar su funcionamiento en la aplicación frontend. — entregable (NO resolver): Aplicación frontend con la integración de servicios en la nube implementada y documentada.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "cloud-integration-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest watch"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "@tanstack/react-query": "5.40.0",
    "axios": "1.7.2",
    "react-router-dom": "6.23.1",
    "zustand": "4.5.2",
    "@aws-sdk/client-cognito-identity-provider": "3.577.0",
    "@aws-sdk/client-s3": "3.577.0",
    "firebase": "10.12.2"
  },
  "devDependencies": {
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "typescript": "5.7.0-dev.20240710",
    "vite": "5.3.1",
    "@vitejs/plugin-react": "4.3.1",
    "eslint": "8.57.0",
    "eslint-plugin-react": "7.34.2",
    "eslint-plugin-react-hooks": "4.6.2",
    "vitest": "1.6.0",
    "@testing-library/react": "15.0.7"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
}

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', '@tanstack/react-query']
  }
});

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@app/*": ["src/app/*"],
      "@features/*": ["src/features/*"],
      "@services/*": ["src/services/*"],
      "@shared/*": ["src/shared/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@config/*": ["src/config/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "vite.config.ts"
  ],
  "references": [
    { "path": "./tsconfig.node.json" }
  ]
}

// === ARCHIVO: src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from '@app/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Configuración centralizada de TanStack Query para manejo de estado asíncrono
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000
    },
    mutations: {
      retry: 1,
      retryDelay: 500
    }
  }
});

// Punto de entrada de la aplicación React
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento root en el DOM');
}

// Montaje de la aplicación con React 19 y manejo de errores global
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// Registro de servicio worker para optimización de Core Web Vitals
def registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log('ServiceWorker registration successful:', registration.scope);
        },
        (error) => {
          console.error('ServiceWorker registration failed:', error);
        }
      );
    });
  }
}

registerServiceWorker();

// Manejo de errores global para operaciones críticas
window.addEventListener('error', (event) => {
  console.error('Error global capturado:', event.error);
  // Aquí se podría integrar con un servicio de monitoreo como Sentry
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
  event.preventDefault();
});

// === ARCHIVO: src/app/App.tsx ===
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@hooks/useAuthStore';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from '@shared/components/LoadingSpinner';
import ErrorFallback from '@shared/components/ErrorFallback';
import Layout from '@shared/components/Layout';

// Lazy loading de features para optimizar el bundle inicial
const AuthFeature = lazy(() => import('@features/auth/AuthFeature'));
const StorageFeature = lazy(() => import('@features/storage/StorageFeature'));
const NotificationsFeature = lazy(() => import('@features/notifications/NotificationsFeature'));

// Componente principal que define la estructura global de la aplicación
const App: React.FC = () => {
  const { isAuthenticated, initializeAuth } = useAuthStore();

  // Inicialización de la sesión de usuario con idempotencia
  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner fullScreen />}> 
        <Layout>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/storage" replace /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/auth/*"
              element={!isAuthenticated ? <AuthFeature /> : <Navigate to="/storage" replace />}
            />
            <Route
              path="/storage/*"
              element={isAuthenticated ? <StorageFeature /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/notifications"
              element={isAuthenticated ? <NotificationsFeature /> : <Navigate to="/auth" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
"

// === ARCHIVO: src/services/authService.ts ===
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from 'firebase/auth';
import { CognitoIdentityProviderClient, InitiateAuthCommand, RespondToAuthChallengeCommand, GlobalSignOutCommand, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

export interface AuthSession {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
  provider: 'firebase' | 'aws-cognito';
}

export interface LoginCredentials {
  email: string;
  password: string;
  sessionToken?: string;
}

export interface AuthServiceConfig {
  provider: 'firebase' | 'aws-cognito';
  firebaseAuth?: Auth;
  cognitoClient?: CognitoIdentityProviderClient;
  clientId: string;
  userPoolId?: string;
}

export class AuthService {
  private config: AuthServiceConfig;
  private currentSession: AuthSession | null = null;
  private sessionIdempotencyKey: string | null = null;

  constructor(config: AuthServiceConfig) {
    this.config = config;
  }

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const idempotencyKey = credentials.sessionToken || this.generateIdempotencyKey(credentials.email);
    
    if (this.sessionIdempotencyKey === idempotencyKey && this.currentSession) {
      return this.currentSession;
    }

    if (this.config.provider === 'firebase' && this.config.firebaseAuth) {
      return this.loginWithFirebase(credentials, idempotencyKey);
    }

    if (this.config.provider === 'aws-cognito' && this.config.cognitoClient) {
      return this.loginWithCognito(credentials, idempotencyKey);
    }

    throw new Error('Proveedor de autenticación no configurado');
  }

  async logout(): Promise<void> {
    if (!this.currentSession) return;

    if (this.config.provider === 'firebase' && this.config.firebaseAuth) {
      await signOut(this.config.firebaseAuth);
    } else if (this.config.provider === 'aws-cognito' && this.config.cognitoClient && this.currentSession.accessToken) {
      await this.config.cognitoClient.send(
        new GlobalSignOutCommand({ AccessToken: this.currentSession.accessToken })
      );
    }

    this.currentSession = null;
    this.sessionIdempotencyKey = null;
  }

  async refreshSession(): Promise<AuthSession> {
    if (!this.currentSession) {
      throw new Error('No hay sesión activa');
    }

    if (this.config.provider === 'aws-cognito' && this.config.cognitoClient && this.currentSession.refreshToken) {
      const command = new InitiateAuthCommand({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: this.config.clientId,
        AuthParameters: {
          REFRESH_TOKEN: this.currentSession.refreshToken,
        },
      });

      const response = await this.config.cognitoClient.send(command);
      
      if (response.AuthenticationResult) {
        this.currentSession = {
          ...this.currentSession,
          accessToken: response.AuthenticationResult.AccessToken || '',
          expiresAt: new Date(Date.now() + 3600000),
        };
      }
    }

    return this.currentSession;
  }

  getCurrentSession(): AuthSession | null {
    return this.currentSession;
  }

  isSessionValid(): boolean {
    if (!this.currentSession) return false;
    return new Date() < this.currentSession.expiresAt;
  }

  onAuthStateChange(callback: (session: AuthSession | null) => void): () => void {
    if (this.config.provider === 'firebase' && this.config.firebaseAuth) {
      return onAuthStateChanged(this.config.firebaseAuth, async (user: User | null) => {
        if (user) {
          const token = await user.getIdToken();
          callback({
            userId: user.uid,
            email: user.email || '',
            accessToken: token,
            expiresAt: new Date(Date.now() + 3600000),
            provider: 'firebase',
          });
        } else {
          callback(null);
        }
      });
    }

    return () => {};
  }

  private generateIdempotencyKey(email: string): string {
    return `login_${email}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private async loginWithFirebase(credentials: LoginCredentials, idempotencyKey: string): Promise<AuthSession> {
    if (!this.config.firebaseAuth) {
      throw new Error('Firebase Auth no está configurado');
    }

    const result = await signInWithEmailAndPassword(
      this.config.firebaseAuth,
      credentials.email,
      credentials.password
    );

    const user = result.user;
    const idToken = await user.getIdToken();

    const session: AuthSession = {
      userId: user.uid,
      email: user.email || credentials.email,
      accessToken: idToken,
      expiresAt: new Date(Date.now() + 3600000),
      provider: 'firebase',
    };

    this.currentSession = session;
    this.sessionIdempotencyKey = idempotencyKey;

    return session;
  }

  private async loginWithCognito(credentials: LoginCredentials, idempotencyKey: string): Promise<AuthSession> {
    if (!this.config.cognitoClient) {
      throw new Error('Cognito client no está configurado');
    }

    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.config.clientId,
      AuthParameters: {
        USERNAME: credentials.email,
        PASSWORD: credentials.password,
      },
    });

    const response = await this.config.cognitoClient.send(command);

    if (!response.AuthenticationResult) {
      throw new Error('Error en la autenticación de Cognito');
    }

    const session: AuthSession = {
      userId: credentials.email,
      email: credentials.email,
      accessToken: response.AuthenticationResult.AccessToken || '',
      refreshToken: response.AuthenticationResult.RefreshToken,
      expiresAt: new Date(
        Date.now() + (response.AuthenticationResult.ExpiresIn || 3600) * 1000
      ),
      provider: 'aws-cognito',
    };

    this.currentSession = session;
    this.sessionIdempotencyKey = idempotencyKey;

    return session;
  }
}

export const createAuthService = (config: AuthServiceConfig): AuthService => {
  return new AuthService(config);
};

// === ARCHIVO: src/services/storageService.ts ===
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll, StorageReference, getStorage } from 'firebase/storage';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface StorageFile {
  key: string;
  url?: string;
  size: number;
  contentType: string;
  lastModified: Date;
  provider: 'firebase-storage' | 'aws-s3';
}

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}

export interface StorageServiceConfig {
  provider: 'firebase-storage' | 'aws-s3';
  firebaseStorage?: ReturnType<typeof getStorage>;
  s3Client?: S3Client;
  bucketName: string;
  region?: string;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  contentType?: string;
  metadata?: Record<string, string>;
}

export class StorageService {
  private config: StorageServiceConfig;
  private basePath: string = '';

  constructor(config: StorageServiceConfig) {
    this.config = config;
  }

  setBasePath(path: string): void {
    this.basePath = path.endsWith('/') ? path : `${path}/`;
  }

  async uploadFile(file: File, path: string, options?: UploadOptions): Promise<StorageFile> {
    const fullPath = `${this.basePath}${path}`;

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      return this.uploadToFirebase(file, fullPath, options);
    }

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      return this.uploadToS3(file, fullPath, options);
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async downloadFile(path: string): Promise<{ blob: Blob; contentType: string }> {
    const fullPath = `${this.basePath}${path}`;

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      return this.downloadFromFirebase(fullPath);
    }

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      return this.downloadFromS3(fullPath);
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async getSignedDownloadUrl(path: string, expiresInSeconds: number = 3600): Promise<string> {
    const fullPath = `${this.basePath}${path}`;

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      const command = new GetObjectCommand({
        Bucket: this.config.bucketName,
        Key: fullPath,
      });

      return getSignedUrl(this.config.s3Client, command, { expiresIn: expiresInSeconds });
    }

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      const storageRef = ref(this.config.firebaseStorage, fullPath);
      return getDownloadURL(storageRef);
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async deleteFile(path: string): Promise<void> {
    const fullPath = `${this.basePath}${path}`;

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      const storageRef = ref(this.config.firebaseStorage, fullPath);
      await deleteObject(storageRef);
      return;
    }

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      await this.config.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.config.bucketName,
          Key: fullPath,
        })
      );
      return;
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async listFiles(prefix?: string): Promise<StorageFile[]> {
    const searchPrefix = prefix ? `${this.basePath}${prefix}` : this.basePath;

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      return this.listFirebaseFiles(searchPrefix);
    }

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      return this.listS3Files(searchPrefix);
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async copyFile(sourcePath: string, destinationPath: string): Promise<void> {
    const fullSource = `${this.basePath}${sourcePath}`;
    const fullDestination = `${this.basePath}${destinationPath}`;

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      const copyCommand = new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: fullDestination,
        CopySource: encodeURIComponent(`${this.config.bucketName}/${fullSource}`),
      });

      await this.config.s3Client.send(copyCommand);
      return;
    }

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      const sourceRef = ref(this.config.firebaseStorage, fullSource);
      const downloadUrl = await getDownloadURL(sourceRef);

      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      const destRef = ref(this.config.firebaseStorage, fullDestination);
      await uploadBytesResumable(destRef, blob);
      return;
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  private async uploadToFirebase(file: File, path: string, options?: UploadOptions): Promise<StorageFile> {
    if (!this.config.firebaseStorage) {
      throw new Error('Firebase Storage no está configurado');
    }

    const storageRef = ref(this.config.firebaseStorage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (options?.onProgress) {
            const progress: UploadProgress = {
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
              percentage: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            };
            options.onProgress(progress);
          }
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            key: path,
            url: downloadURL,
            size: file.size,
            contentType: file.type,
            lastModified: new Date(),
            provider: 'firebase-storage',
          });
        }
      );
    });
  }

  private async uploadToS3(file: File, path: string, options?: UploadOptions): Promise<StorageFile> {
    if (!this.config.s3Client) {
      throw new Error('S3 client no está configurado');
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: this.config.bucketName,
      Key: path,
      Body: uint8Array,
      ContentType: options?.contentType || file.type,
      Metadata: options?.metadata,
    });

    await this.config.s3Client.send(command);

    const signedUrl = await this.getSignedDownloadUrl(path, 604800);

    return {
      key: path,
      url: signedUrl,
      size: file.size,
      contentType: file.type,
      lastModified: new Date(),
      provider: 'aws-s3',
    };
  }

  private async downloadFromFirebase(path: string): Promise<{ blob: Blob; contentType: string }> {
    if (!this.config.firebaseStorage) {
      throw new Error('Firebase Storage no está configurado');
    }

    const storageRef = ref(this.config.firebaseStorage, path);
    const url = await getDownloadURL(storageRef);

    const response = await fetch(url);
    const blob = await response.blob();
    const contentType = blob.type || 'application/octet-stream';

    return { blob, contentType };
  }

  private async downloadFromS3(path: string): Promise<{ blob: Blob; contentType: string }> {
    if (!this.config.s3Client) {
      throw new Error('S3 client no está configurado');
    }

    const command = new GetObjectCommand({
      Bucket: this.config.bucketName,
      Key: path,
    });

    const response = await this.config.s3Client.send(command);
    
    if (!response.Body) {
      throw new Error('Cuerpo de respuesta vacío');
    }

    const blob = await response.Body.transformToBlob();
    const contentType = response.ContentType || 'application/octet-stream';

    return { blob, contentType };
  }

  private async listFirebaseFiles(prefix: string): Promise<StorageFile[]> {
    if (!this.config.firebaseStorage) {
      throw new Error('Firebase Storage no está configurado');
    }

    const storageRef = ref(this.config.firebaseStorage, prefix);
    const result = await listAll(storageRef);

    const files: StorageFile[] = await Promise.all(
      result.items.map(async (item: StorageReference) => {
        const url = await getDownloadURL(item);
        const metadata = await item.getMetadata();

        return {
          key: item.fullPath,
          url,
          size: metadata.size || 0,
          contentType: metadata.contentType || 'application/octet-stream',
          lastModified: metadata.updated ? new Date(metadata.updated) : new Date(),
          provider: 'firebase-storage',
        };
      })
    );

    return files;
  }

  private async listS3Files(prefix: string): Promise<StorageFile[]> {
    if (!this.config.s3Client) {
      throw new Error('S3 client no está configurado');
    }

    const command = new ListObjectsV2Command({
      Bucket: this.config.bucketName,
      Prefix: prefix,
    });

    const response: ListObjectsV2CommandOutput = await this.config.s3Client.send(command);

    const files: StorageFile[] = (response.Contents || []).map((item) => ({
      key: item.Key || '',
      size: item.Size || 0,
      contentType: this.inferContentType(item.Key || ''),
      lastModified: item.LastModified || new Date(),
      provider: 'aws-s3',
    }));

    return files;
  }

  private inferContentType(key: string): string {
    const ext = key.split('.').pop()?.toLowerCase();
    const contentTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      pdf: 'application/pdf',
      json: 'application/json',
      xml: 'application/xml',
      txt: 'text/plain',
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      mp4: 'video/mp4',
      mp3: 'audio/mpeg',
    };

    return contentTypes[ext || ''] || 'application/octet-stream';
  }
}

export const createStorageService = (config: StorageServiceConfig): StorageService => {
  return new StorageService(config);
};

// === ARCHIVO: src/services/notificationService.ts ===
import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import { getMessaging, Messaging, getToken, onMessage, Unsubscribe } from 'firebase/messaging';
import { cloudConfig } from '@config/cloudConfig';
import { errorHandler } from '@utils/errorHandler';

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, string>;
  actions?: Array<{ action: string; title: string; icon?: string }>;
  vibrate?: number[];
  priority?: 'normal' | 'high';
  ttl?: number;
}

export interface NotificationPermission {
  granted: boolean;
  status: 'granted' | 'denied' | 'default' | 'prompt';
  token?: string;
}

export type MessageHandler = (payload: { notification?: NotificationPayload; data?: Record<string, string> }) => void;

class NotificationService {
  private app: FirebaseApp | null = null;
  private messaging: Messaging | null = null;
  private foregroundHandler: Unsubscribe | null = null;
  private deviceToken: string | null = null;
  private isInitialized = false;
  private messageHandlers: Set<MessageHandler> = new Set();

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      const config = cloudConfig.getFirebaseConfig();
      
      if (!config.apiKey || !config.projectId) {
        throw new Error('Configuración de Firebase incompleta para notificaciones push');
      }

      try {
        this.app = getApp('notification-app');
      } catch {
        this.app = initializeApp(config, 'notification-app');
      }

      this.messaging = getMessaging(this.app);
      this.isInitialized = true;
      
      console.log('[NotificationService] Firebase Messaging inicializado correctamente');
    } catch (error) {
      const handledError = errorHandler.handleError(error, 'NotificationService.initialize');
      console.error('[NotificationService] Error al inicializar Firebase Messaging:', handledError.message);
      throw handledError;
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    try {
      if (!this.messaging) {
        await this.initialize();
      }

      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const token = await this.getDeviceToken();
        return {
          granted: true,
          status: 'granted',
          token
        };
      }

      return {
        granted: false,
        status: permission as 'denied' | 'default'
      };
    } catch (error) {
      const handledError = errorHandler.handleError(error, 'NotificationService.requestPermission');
      console.error('[NotificationService] Error al solicitar permisos:', handledError.message);
      return {
        granted: false,
        status: 'denied'
      };
    }
  }

  async getDeviceToken(): Promise<string> {
    if (this.deviceToken) {
      return this.deviceToken;
    }

    try {
      if (!this.messaging) {
        await this.initialize();
      }

      const token = await getToken(this.messaging!, {
        vapidKey: cloudConfig.getFirebaseConfig().vapidKey
      });

      this.deviceToken = token;
      console.log('[NotificationService] Token de dispositivo obtenido');
      return token;
    } catch (error) {
      const handledError = errorHandler.handleError(error, 'NotificationService.getDeviceToken');
      console.error('[NotificationService] Error al obtener token:', handledError.message);
      throw handledError;
    }
  }

  onForegroundMessage(handler: MessageHandler): () => void {
    if (!this.messaging) {
      console.warn('[NotificationService] Messaging no inicializado. Llame a initialize() primero.');
      return () => {};
    }

    this.messageHandlers.add(handler);

    if (!this.foregroundHandler) {
      this.foregroundHandler = onMessage(this.messaging!, (payload) => {
        console.log('[NotificationService] Mensaje recibido en foreground:', payload);
        
        const notification: NotificationPayload = payload.notification ? {
          title: payload.notification.title || '',
          body: payload.notification.body || '',
          icon: payload.notification.image || undefined,
          data: payload.data
        } : {
          title: 'Nueva notificación',
          body: JSON.stringify(payload.data || {}),
          data: payload.data
        };

        this.messageHandlers.forEach(h => {
          try {
            h({ notification, data: payload.data });
          } catch (handlerError) {
            console.error('[NotificationService] Error en handler de mensaje:', handlerError);
          }
        });
      });
    }

    return () => {
      this.messageHandlers.delete(handler);
      if (this.messageHandlers.size === 0 && this.foregroundHandler) {
        this.foregroundHandler();
        this.foregroundHandler = null;
      }
    };
  }

  async subscribeToTopic(token: string, topic: string): Promise<void> {
    try {
      const response = await fetch(
        `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `key=${cloudConfig.getFirebaseConfig().serverKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error al suscribir al topic: ${response.status}`);
      }

      console.log(`[NotificationService] Suscrito al topic: ${topic}`);
    } catch (error) {
      const handledError = errorHandler.handleError(error, 'NotificationService.subscribeToTopic');
      console.error(`[NotificationService] Error al suscribir al topic ${topic}:`, handledError.message);
      throw handledError;
    }
  }

  async unsubscribeFromTopic(token: string, topic: string): Promise<void> {
    try {
      const response = await fetch(
        `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `key=${cloudConfig.getFirebaseConfig().serverKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error al cancelar suscripción del topic: ${response.status}`);
      }

      console.log(`[NotificationService] Desuscrito del topic: ${topic}`);
    } catch (error) {
      const handledError = errorHandler.handleError(error, 'NotificationService.unsubscribeFromTopic');
      console.error(`[NotificationService] Error al desuscribir del topic ${topic}:`, handledError.message);
      throw handledError;
    }
  }

  async sendLocalNotification(payload: NotificationPayload): Promise<void> {
    if (!('Notification' in window)) {
      console.warn('[NotificationService] Notifications API no disponible en este navegador');
      return;
    }

    if (Notification.permission !== 'granted') {
      console.warn('[NotificationService] Permiso de notificaciones no concedido');
      return;
    }

    try {
      const notification = new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icons/notification-icon.png',
        badge: payload.badge || '/icons/notification-badge.png',
        tag: payload.tag || 'default-notification',
        data: payload.data,
        vibrate: payload.vibrate,
        requireInteraction: payload.priority === 'high'
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      if (payload.ttl) {
        setTimeout(() => notification.close(), payload.ttl);
      }

      console.log('[NotificationService] Notificación local mostrada');
    } catch (error) {
      const handledError = errorHandler.handleError(error, 'NotificationService.sendLocalNotification');
      console.error('[NotificationService] Error al mostrar notificación local:', handledError.message);
    }
  }

  getDeviceTokenSync(): string | null {
    return this.deviceToken;
  }

  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  cleanup(): void {
    if (this.foregroundHandler) {
      this.foregroundHandler();
      this.foregroundHandler = null;
    }
    this.messageHandlers.clear();
    this.deviceToken = null;
    this.isInitialized = false;
    this.messaging = null;
    this.app = null;
    console.log('[NotificationService] Recursos limpiados');
  }
}

export const notificationService = new NotificationService();
export default notificationService;

// === ARCHIVO: src/features/auth/AuthFeature.tsx ===
import React from 'react';
import { authService, AuthUser } from '@services/authService';

export const AuthFeature: React.FC = () => {
  return (
    <div className="auth-feature">
      <h2>Autenticación</h2>
      <p>Implementa la funcionalidad de autenticación con el proveedor de nube.</p>
    </div>
  );
};

export default AuthFeature;

// === ARCHIVO: src/features/storage/StorageFeature.tsx ===
import React, { useState, useCallback } from 'react';
import { storageService, StorageFile, UploadProgress } from '@services/storageService';
import { CloudServiceCard } from '@shared/components/CloudServiceCard';

interface StorageFeatureProps {
  onError?: (error: Error) => void;
}

export const StorageFeature: React.FC<StorageFeatureProps> = ({ onError }) => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('default');

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const uploadedFile = await storageService.uploadFile(file, selectedFolder, (prog) => {
        setProgress(prog);
      });
      setFiles((prev) => [...prev, uploadedFile]);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al subir archivo');
      onError?.(err);
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }, [selectedFolder, onError]);

  const handleDelete = useCallback(async (fileId: string) => {
    try {
      await storageService.deleteFile(fileId);
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al eliminar archivo');
      onError?.(err);
    }
  }, [onError]);

  const handleListFiles = useCallback(async () => {
    try {
      const fileList = await storageService.listFiles(selectedFolder);
      setFiles(fileList);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al listar archivos');
      onError?.(err);
    }
  }, [selectedFolder, onError]);

  const handleDownload = useCallback(async (fileId: string) => {
    try {
      const downloadUrl = await storageService.getDownloadUrl(fileId);
      window.open(downloadUrl, '_blank');
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al obtener URL de descarga');
      onError?.(err);
    }
  }, [onError]);

  return (
    <div className="storage-feature">
      <h2>Almacenamiento en la Nube</h2>
      <CloudServiceCard
        title="AWS S3 / Firebase Storage"
        description="Almacenamiento escalable de archivos"
        status="active"
      />
      <div className="storage-controls">
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="folder-select"
        >
          <option value="default">Carpeta Principal</option>
          <option value="documents">Documentos</option>
          <option value="images">Imágenes</option>
          <option value="videos">Videos</option>
        </select>
        <button onClick={handleListFiles} disabled={uploading} className="btn-list">
          Listar Archivos
        </button>
        <label className="upload-label">
          <input
            type="file"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          <span className="btn-upload">{uploading ? 'Subiendo...' : 'Subir Archivo'}</span>
        </label>
      </div>
      {progress && (
        <div className="upload-progress">
          <progress value={progress.percentage} max={100} />
          <span>{progress.percentage}% - {progress.bytesUploaded} / {progress.totalBytes} bytes</span>
        </div>
      )}
      <div className="file-list">
        {files.length === 0 ? (
          <p className="no-files">No hay archivos en esta carpeta</p>
        ) : (
          files.map((file) => (
            <div key={file.id} className="file-item">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
              <span className="file-date">{new Date(file.lastModified).toLocaleDateString()}</span>
              <button onClick={() => handleDownload(file.id)} className="btn-download">
                Descargar
              </button>
              <button onClick={() => handleDelete(file.id)} className="btn-delete">
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StorageFeature;

// === ARCHIVO: src/features/notifications/NotificationsFeature.tsx ===
import React, { useState, useEffect, useCallback } from 'react';
import { notificationService, NotificationMessage, NotificationPreferences } from '@services/notificationService';
import { CloudServiceCard } from '@shared/components/CloudServiceCard';

interface NotificationsFeatureProps {
  userId?: string;
  onNotification?: (notification: NotificationMessage) => void;
}

export const NotificationsFeature: React.FC<NotificationsFeatureProps> = ({ userId, onNotification }) => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    const connectToNotifications = async () => {
      try {
        await notificationService.connect(userId);
        setIsConnected(true);
      } catch (error) {
        console.error('Error al conectar con servicio de notificaciones:', error);
        setIsConnected(false);
      }
    };

    if (userId) {
      connectToNotifications();
    }

    return () => {
      notificationService.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = notificationService.onMessage((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      onNotification?.(notification);
    });

    return () => {
      unsubscribe();
    };
  }, [onNotification]);

  const handleSendNotification = useCallback(async (title: string, body: string) => {
    try {
      await notificationService.sendNotification({
        title,
        body,
        type: 'info',
        priority: 'normal',
      });
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }, []);

  const handleMarkAsRead = useCallback(async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  }, []);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error al marcar todas como leídas:', error);
    }
  }, []);

  const handleUpdatePreferences = useCallback(async (newPreferences: NotificationPreferences) => {
    try {
      await notificationService.updatePreferences(newPreferences);
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Error al actualizar preferencias:', error);
    }
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notifications-feature">
      <h2>Notificaciones Push</h2>
      <CloudServiceCard
        title="Firebase Cloud Messaging"
        description="Sistema de notificaciones en tiempo real"
        status={isConnected ? 'active' : 'inactive'}
      />
      <div className="notifications-header">
        <div className="notification-stats">
          <span className="total-count">Total: {notifications.length}</span>
          <span className="unread-count">No leídas: {unreadCount}</span>
        </div>
        <button onClick={handleMarkAllAsRead} disabled={unreadCount === 0} className="btn-mark-all">
          Marcar todo como leído
        </button>
      </div>
      <div className="filter-controls">
        <button
          onClick={() => setFilter('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
        >
          No leídas
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
        >
          Leídas
        </button>
      </div>
      <div className="preferences-section">
        <h3>Preferencias</h3>
        <label className="preference-toggle">
          <input
            type="checkbox"
            checked={preferences.email}
            onChange={(e) => handleUpdatePreferences({ ...preferences, email: e.target.checked })}
          />
          Notificaciones por Email
        </label>
        <label className="preference-toggle">
          <input
            type="checkbox"
            checked={preferences.push}
            onChange={(e) => handleUpdatePreferences({ ...preferences, push: e.target.checked })}
          />
          Notificaciones Push
        </label>
        <label className="preference-toggle">
          <input
            type="checkbox"
            checked={preferences.sms}
            onChange={(e) => handleUpdatePreferences({ ...preferences, sms: e.target.checked })}
          />
          Notificaciones SMS
        </label>
      </div>
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <p className="no-notifications">No hay notificaciones</p>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              onClick={() => !notification.read && handleMarkAsRead(notification.id)}
            >
              <div className="notification-header">
                <span className="notification-title">{notification.title}</span>
                <span className="notification-time">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="notification-body">{notification.body}</p>
              {notification.actionUrl && (
                <a href={notification.actionUrl} className="notification-action">
                  Ver más
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsFeature;

// === ARCHIVO: src/types/cloudServices.d.ts ===
import { CloudProvider, CloudService, CloudServiceConfig, CloudServiceStatus, CloudServiceResponse, CloudServiceMetrics, CloudServiceFeature } from './cloudServices.d';

export type { CloudProvider, CloudService, CloudServiceConfig, CloudServiceStatus, CloudServiceResponse, CloudServiceMetrics, CloudServiceFeature };

export type ProviderType = 'aws' | 'firebase' | 'azure' | 'gcp';

export interface CloudServiceEvaluation {
  serviceId: string;
  provider: ProviderType;
  serviceName: string;
  category: 'auth' | 'storage' | 'notifications' | 'compute' | 'database';
  pros: string[];
  cons: string[];
  estimatedCost: number;
  latency: number;
  scalability: 'low' | 'medium' | 'high';
  securityFeatures: string[];
  complianceCertifications: string[];
  easeOfIntegration: number;
  documentationQuality: number;
  communitySupport: number;
  lastUpdated: Date;
}

export interface CloudIntegrationConfig {
  enabledServices: string[];
  fallbackProvider?: ProviderType;
  retryAttempts: number;
  timeout: number;
  cacheDuration: number;
}

export interface CloudServiceHealth {
  serviceId: string;
  status: 'healthy' | 'degraded' | 'unavailable';
  lastCheck: Date;
  responseTime: number;
  errorRate: number;
}

export interface CloudServiceUsage {
  serviceId: string;
  requestsPerMinute: number;
  dataTransfer: number;
  computeUnits: number;
  storageUsed: number;
}

export type CloudEventHandler = (event: CloudServiceEvent) => void;

export interface CloudServiceEvent {
  type: 'auth' | 'storage' | 'notification' | 'error' | 'health';
  serviceId: string;
  timestamp: Date;
  payload: unknown;
}

export interface CloudServiceError {
  serviceId: string;
  code: string;
  message: string;
  timestamp: Date;
  recoverable: boolean;
}

export const CLOUD_PROVIDERS: Record<ProviderType, CloudProvider>;
export const DEFAULT_CONFIG: CloudIntegrationConfig;

// === ARCHIVO: src/shared/components/CloudServiceCard.tsx ===
import React from 'react';
import { CloudServiceEvaluation, CloudServiceHealth, ProviderType } from '@/types/cloudServices';

interface CloudServiceCardProps {
  service: CloudServiceEvaluation;
  health?: CloudServiceHealth;
  onSelect?: (serviceId: string) => void;
  onConfigure?: (serviceId: string) => void;
  isSelected?: boolean;
  isLoading?: boolean;
}

const providerLogos: Record<ProviderType, string> = {
  aws: '☁️',
  firebase: '🔥',
  azure: '💙',
  gcp: '🌐',
};

const categoryIcons: Record<string, string> = {
  auth: '🔐',
  storage: '💾',
  notifications: '🔔',
  compute: '⚡',
  database: '🗄️',
};

const statusColors: Record<string, string> = {
  healthy: 'bg-green-100 border-green-500',
  degraded: 'bg-yellow-100 border-yellow-500',
  unavailable: 'bg-red-100 border-red-500',
};

export const CloudServiceCard: React.FC<CloudServiceCardProps> = ({
  service,
  health,
  onSelect,
  onConfigure,
  isSelected = false,
  isLoading = false,
}) => {
  const handleSelect = () => {
    if (!isLoading && onSelect) {
      onSelect(service.serviceId);
    }
  };

  const handleConfigure = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoading && onConfigure) {
      onConfigure(service.serviceId);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScalabilityIndicator = (level: string): string => {
    switch (level) {
      case 'high': return '⬆⬆⬆';
      case 'medium': return '⬆⬆';
      case 'low': return '⬆';
      default: return '—';
    }
  };

  return (
    <div
      className={`
        p-4 rounded-lg border-2 transition-all cursor-pointer
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        ${health ? statusColors[health.status] : ''}
      `}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleSelect()}
      aria-pressed={isSelected}
      aria-label={`Servicio ${service.serviceName} de ${service.provider}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-hidden="true">
            {providerLogos[service.provider]}
          </span>
          <div>
            <h3 className="font-semibold text-gray-900">{service.serviceName}</h3>
            <span className="text-sm text-gray-500 capitalize">{service.provider}</span>
          </div>
        </div>
        <span className="text-xl" role="img" aria-hidden="true">
          {categoryIcons[service.category]}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex flex-wrap gap-1 mb-2">
          {service.pros.slice(0, 3).map((pro, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full"
            >
              + {pro}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {service.cons.slice(0, 2).map((con, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full"
            >
              - {con}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Latencia:</span>
          <span className="font-medium">{service.latency}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Costo est.:</span>
          <span className="font-medium">${service.estimatedCost}/mes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Escalabilidad:</span>
          <span>{getScalabilityIndicator(service.scalability)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Integración:</span>
          <span className={getScoreColor(service.easeOfIntegration)}>
            {service.easeOfIntegration}/10
          </span>
        </div>
      </div>

      {health && (
        <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
          <div className="flex justify-between">
            <span>Estado:</span>
            <span className={`font-medium capitalize ${
              health.status === 'healthy' ? 'text-green-600' :
              health.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {health.status}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Tiempo respuesta:</span>
            <span>{health.responseTime}ms</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Tasa error:</span>
            <span>{(health.errorRate * 100).toFixed(2)}%</span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleSelect}
          disabled={isLoading}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          aria-label={`Seleccionar ${service.serviceName}`}
        >
          {isSelected ? 'Seleccionado' : 'Seleccionar'}
        </button>
        <button
          onClick={handleConfigure}
          disabled={isLoading}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
          aria-label={`Configurar ${service.serviceName}`}
        >
          ⚙️
        </button>
      </div>

      {service.securityFeatures.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500 block mb-1">Seguridad:</span>
          <div className="flex flex-wrap gap-1">
            {service.securityFeatures.slice(0, 4).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudServiceCard;

// === ARCHIVO: src/hooks/useCloudServices.ts ===
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {
  CloudServiceEvaluation,
  CloudServiceHealth,
  CloudServiceUsage,
  CloudServiceError,
  CloudIntegrationConfig,
  ProviderType,
} from '@/types/cloudServices';
import { errorHandler } from '@/utils/errorHandler';

const API_BASE_URL = '/api/cloud-services';

const DEFAULT_CONFIG: CloudIntegrationConfig = {
  enabledServices: [],
  fallbackProvider: 'aws',
  retryAttempts: 3,
  timeout: 5000,
  cacheDuration: 300000,
};

interface UseCloudServicesOptions {
  config?: Partial<CloudIntegrationConfig>;
  onError?: (error: CloudServiceError) => void;
  onSuccess?: (data: CloudServiceEvaluation[]) => void;
}

interface UseCloudServicesReturn {
  services: CloudServiceEvaluation[];
  isLoading: boolean;
  isError: boolean;
  error: CloudServiceError | null;
  selectedServices: string[];
  healthStatus: Map<string, CloudServiceHealth>;
  usageData: Map<string, CloudServiceUsage>;
  selectService: (serviceId: string) => void;
  deselectService: (serviceId: string) => void;
  toggleService: (serviceId: string) => void;
  refreshServices: () => void;
  getServiceById: (serviceId: string) => CloudServiceEvaluation | undefined;
  getServicesByProvider: (provider: ProviderType) => CloudServiceEvaluation[];
  getServicesByCategory: (category: string) => CloudServiceEvaluation[];
  evaluateService: (serviceId: string) => Promise<void>;
  checkHealth: (serviceId: string) => Promise<CloudServiceHealth>;
  getUsage: (serviceId: string) => Promise<CloudServiceUsage>;
}

const mockServices: CloudServiceEvaluation[] = [
  {
    serviceId: 'aws-cognito',
    provider: 'aws',
    serviceName: 'Amazon Cognito',
    category: 'auth',
    pros: ['Integración nativa con AWS', 'Alta escalabilidad', 'Soporte para OAuth2'],
    cons: ['Curva de aprendizaje pronunciada', 'Costos variables'],
    estimatedCost: 150,
    latency: 45,
    scalability: 'high',
    securityFeatures: ['MFA', 'Cifrado AES-256', 'Cumplimiento SOC'],
    complianceCertifications: ['SOC 2', 'ISO 27001', 'HIPAA'],
    easeOfIntegration: 7,
    documentationQuality: 9,
    communitySupport: 8,
    lastUpdated: new Date(),
  },
  {
    serviceId: 'aws-s3',
    provider: 'aws',
    serviceName: 'Amazon S3',
    category: 'storage',
    pros: ['99.999999999% durabilidad', 'Lifecycle policies', 'Versioning'],
    cons: ['Configuración de permisos compleja', 'Costos por solicitud'],
    estimatedCost: 50,
    latency: 30,
    scalability: 'high',
    securityFeatures: ['Cifrado SSE-KMS', 'Bucket policies', 'Access Control Lists'],
    complianceCertifications: ['SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS'],
    easeOfIntegration: 9,
    documentationQuality: 10,
    communitySupport: 9,
    lastUpdated: new Date(),
  },
  {
    serviceId: 'firebase-auth',
    provider: 'firebase',
    serviceName: 'Firebase Authentication',
    category: 'auth',
    pros: ['SDK completo para múltiples plataformas', 'UI preconstruida', 'Integración con Firebase Analytics'],
    cons: ['Dependencia del ecosistema Google', 'Límites en tier gratuito'],
    estimatedCost: 75,
    latency: 55,
    scalability: 'high',
    securityFeatures: ['Recaptcha', 'Phone authentication', 'Email link auth'],
    complianceCertifications: ['SOC 2', 'COPPA'],
    easeOfIntegration: 9,
    documentationQuality: 9,
    communitySupport: 8,
    lastUpdated: new Date(),
  },
  {
    serviceId: 'firebase-storage',
    provider: 'firebase',
    serviceName: 'Firebase Cloud Storage',
    category: 'storage',
    pros: ['Integración con Firebase Auth', 'SDKs para móviles', 'Firebase Hosting integrado'],
    cons: ['Costos escalan rápidamente', 'Dependencia de región'],
    estimatedCost: 40,
    latency: 60,
    scalability: 'high',
    securityFeatures: ['Firebase Security Rules', 'Signed URLs', 'Cifrado en tránsito'],
    complianceCertifications: ['SOC 2'],
    easeOfIntegration: 8,
    documentationQuality: 8,
    communitySupport: 7,
    lastUpdated: new Date(),
  },
  {
    serviceId: 'firebase-cloud-messaging',
    provider: 'firebase',
    serviceName: 'Firebase Cloud Messaging',
    category: 'notifications',
    pros: ['Gratis hasta 10K mensajes', 'Segmentación de usuarios', 'Analytics integrado'],
    cons: ['Solo hasta 4KB por mensaje', 'Sin garantía de entrega'],
    estimatedCost: 25,
    latency: 100,
    scalability: 'high',
    securityFeatures: ['Topic subscriptions', 'Device groups', 'APNs/HCM integration'],
    complianceCertifications: ['SOC 2'],
    easeOfIntegration: 9,
    documentationQuality: 9,
    communitySupport: 8,
    lastUpdated: new Date(),
  },
];

export const useCloudServices = (options?: UseCloudServicesOptions): UseCloudServicesReturn => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [healthStatus, setHealthStatus] = useState<Map<string, CloudServiceHealth>>(new Map());
  const [usageData, setUsageData] = useState<Map<string, CloudServiceUsage>>(new Map());
  const [error, setError] = useState<CloudServiceError | null>(null);

  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...options?.config }),
    [options?.config]
  );

  const queryClient = useQueryClient();

  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<CloudServiceEvaluation[]>({
    queryKey: ['cloud-services'],
    queryFn: async () => {
      try {
        const response = await axios.get<CloudServiceEvaluation[]>(
          `${API_BASE_URL}/evaluations`,
          {
            timeout: config.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        const serviceError: CloudServiceError = {
          serviceId: 'api',
          code: axiosError.code || 'UNKNOWN_ERROR',
          message: errorHandler.handleError(err),
          timestamp: new Date(),
          recoverable: true,
        };
        setError(serviceError);
        options?.onError?.(serviceError);
        console.warn('API no disponible, usando datos mock:', serviceError.message);
        return mockServices;
      }
    },
    staleTime: config.cacheDuration,
    retry: config.retryAttempts,
    refetchOnWindowFocus: false,
  });

  const selectService = useCallback((serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) return prev;
      return [...prev, serviceId];
    });
  }, []);

  const deselectService = useCallback((serviceId: string) => {
    setSelectedServices((prev) => prev.filter((id) => id !== serviceId));
  }, []);

  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  }, []);

  const getServiceById = useCallback(
    (serviceId: string): CloudServiceEvaluation | undefined => {
      return services.find((s) => s.serviceId === serviceId);
    },
    [services]
  );

  const getServicesByProvider = useCallback(
    (provider: ProviderType): CloudServiceEvaluation[] => {
      return services.filter((s) => s.provider === provider);
    },
    [services]
  );

  const getServicesByCategory = useCallback(
    (category: string): CloudServiceEvaluation[] => {
      return services.filter((s) => s.category === category);
    },
    [services]
  );

  const checkHealth = useCallback(
    async (serviceId: string): Promise<CloudServiceHealth> => {
      try {
        const response = await axios.get<CloudServiceHealth>(
          `${API_BASE_URL}/${serviceId}/health`,
          { timeout: config.timeout }
        );
        setHealthStatus((prev) => {
          const newMap = new Map(prev);
          newMap.set(serviceId, response.data);
          return newMap;
        });
        return response.data;
      } catch (err) {
        const mockHealth: CloudServiceHealth = {
          serviceId,
          status: 'healthy',
          lastCheck: new Date(),
          responseTime: Math.floor(Math.random() * 100) + 20,
          errorRate: Math.random() * 0.01,
        };
        setHealthStatus((prev) => {
          const newMap = new Map(prev);
          newMap.set(serviceId, mockHealth);
          return newMap;
        });
        return mockHealth;
      }
    },
    [config.timeout]
  );

  const getUsage = useCallback(
    async (serviceId: string): Promise<CloudServiceUsage> => {
      try {
        const response = await axios.get<CloudServiceUsage>(
          `${API_BASE_URL}/${serviceId}/usage`,
          { timeout: config.timeout }
        );
        setUsageData((prev) => {
          const newMap = new Map(prev);
          newMap.set(serviceId, response.data);
          return newMap;
        });
        return response.data;
      } catch (err) {
        const mockUsage: CloudServiceUsage = {
          serviceId,
          requestsPerMinute: Math.floor(Math.random() * 1000),
          dataTransfer: Math.floor(Math.random() * 100),
          computeUnits: Math.floor(Math.random() * 50),
          storageUsed: Math.floor(Math.random() * 1000),
        };
        setUsageData((prev) => {
          const newMap = new Map(prev);
          newMap.set(serviceId, mockUsage);
          return newMap;
        });
        return mockUsage;
      }
    },
    [config.timeout]
  );

  const evaluateServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const response = await axios.post<CloudServiceEvaluation>(
        `${API_BASE_URL}/${serviceId}/evaluate`,
        {},
        { timeout: config.timeout }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cloud-services'], (old: CloudServiceEvaluation[] | undefined) => {
        if (!old) return [data];
        return old.map((s) => (s.serviceId === data.serviceId ? data : s));
      });
      options?.onSuccess?.([data]);
    },
    onError: (err, serviceId) => {
      const serviceError: CloudServiceError = {
        serviceId,
        code: 'EVALUATION_FAILED',
        message: errorHandler.handleError(err),
        timestamp: new Date(),
        recoverable: true,
      };
      setError(serviceError);
      options?.onError?.(serviceError);
    },
  });

  const evaluateService = useCallback(
    async (serviceId: string): Promise<void> => {
      await evaluateServiceMutation.mutateAsync(serviceId);
    },
    [evaluateServiceMutation]
  );

  const refreshServices = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['cloud-services'] });
    setHealthStatus(new Map());
    setUsageData(new Map());
  }, [queryClient]);

  useEffect(() => {
    if (services.length > 0 && healthStatus.size === 0) {
      services.forEach((service) => {
        checkHealth(service.serviceId);
      });
    }
  }, [services, healthStatus.size, checkHealth]);

  return {
    services,
    isLoading,
    isError,
    error,
    selectedServices,
    healthStatus,
    usageData,
    selectService,
    deselectService,
    toggleService,
    refreshServices,
    getServiceById,
    getServicesByProvider,
    getServicesByCategory,
    evaluateService,
    checkHealth,
    getUsage,
  };
};

export default useCloudServices;

// === ARCHIVO: src/config/cloudConfig.ts ===
export interface CloudServiceConfig {
  region?: string;
  endpoint?: string;
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export interface CloudConfig {
  aws: {
    region: string;
    cognito: CloudServiceConfig;
    s3: CloudServiceConfig;
  };
  firebase: CloudServiceConfig;
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
}

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return import.meta.env[key] || defaultValue;
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = import.meta.env[key];
  return value ? parseInt(value, 10) : defaultValue;
};

export const cloudConfig: CloudConfig = {
  aws: {
    region: getEnvVar('VITE_AWS_REGION', 'us-east-1'),
    cognito: {
      region: getEnvVar('VITE_AWS_REGION', 'us-east-1'),
      endpoint: getEnvVar('VITE_COGNITO_ENDPOINT'),
      apiKey: getEnvVar('VITE_COGNITO_API_KEY'),
    },
    s3: {
      region: getEnvVar('VITE_AWS_REGION', 'us-east-1'),
      endpoint: getEnvVar('VITE_S3_ENDPOINT'),
    },
  },
  firebase: {
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
  },
  api: {
    baseUrl: getEnvVar('VITE_API_BASE_URL', 'https://api.example.com'),
    timeout: getEnvNumber('VITE_API_TIMEOUT', 30000),
    retryAttempts: getEnvNumber('VITE_API_RETRY_ATTEMPTS', 3),
  },
};

export const getCognitoConfig = () => ({
  region: cloudConfig.aws.region,
  credentials: {
    accessKeyId: cloudConfig.aws.cognito.apiKey || '',
    secretAccessKey: getEnvVar('VITE_COGNITO_SECRET_KEY', ''),
  },
});

export const getS3Config = () => ({
  region: cloudConfig.aws.s3.region,
  endpoint: cloudConfig.aws.s3.endpoint || undefined,
  credentials: {
    accessKeyId: getEnvVar('VITE_S3_ACCESS_KEY', ''),
    secretAccessKey: getEnvVar('VITE_S3_SECRET_KEY', ''),
  },
});

export const getFirebaseConfig = () => ({
  authDomain: cloudConfig.firebase.authDomain,
  projectId: cloudConfig.firebase.projectId,
  storageBucket: cloudConfig.firebase.storageBucket,
  messagingSenderId: cloudConfig.firebase.messagingSenderId,
  appId: cloudConfig.firebase.appId,
});

export const getApiConfig = () => ({
  baseURL: cloudConfig.api.baseUrl,
  timeout: cloudConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// === ARCHIVO: src/utils/errorHandler.ts ===
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export enum CloudServiceType {
  AWS_COGNITO = 'AWS_COGNITO',
  AWS_S3 = 'AWS_S3',
  FIREBASE = 'FIREBASE',
  API = 'API',
}

export interface CloudErrorContext {
  service: CloudServiceType;
  operation: string;
  timestamp: number;
  requestId?: string;
  userId?: string;
}

export interface CloudError extends Error {
  severity: ErrorSeverity;
  service: CloudServiceType;
  context: CloudErrorContext;
  retryable: boolean;
  statusCode?: number;
  code?: string;
}

export type ErrorHandlerCallback = (error: CloudError) => void;

class CloudErrorHandler {
  private errorListeners: ErrorHandlerCallback[] = [];
  private errorLog: CloudError[] = [];
  private maxLogSize: number = 100;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleGlobalError);
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
  }

  private handleGlobalError = (event: ErrorEvent): void => {
    const error = this.createError(
      event.message,
      ErrorSeverity.ERROR,
      CloudServiceType.API,
      { service: CloudServiceType.API, operation: 'window.onerror', timestamp: Date.now() }
    );
    this.notifyListeners(error);
  };

  private handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
    const error = this.createError(
      event.reason?.message || 'Unhandled Promise Rejection',
      ErrorSeverity.ERROR,
      CloudServiceType.API,
      { service: CloudServiceType.API, operation: 'unhandledrejection', timestamp: Date.now() }
    );
    this.notifyListeners(error);
  };

  createError(
    message: string,
    severity: ErrorSeverity,
    service: CloudServiceType,
    context: CloudErrorContext,
    options?: { retryable?: boolean; statusCode?: number; code?: string }
  ): CloudError {
    const error = new Error(message) as CloudError;
    error.severity = severity;
    error.service = service;
    error.context = context;
    error.retryable = options?.retryable ?? this.isRetryableError(service);
    error.statusCode = options?.statusCode;
    error.code = options?.code;
    return error;
  }

  private isRetryableError(service: CloudServiceType): boolean {
    return service === CloudServiceType.API || service === CloudServiceType.AWS_S3;
  }

  handleError(error: CloudError): void {
    console.error(`[${error.severity.toUpperCase()}] ${error.service}:`, error.message);
    
    this.errorLog.push(error);
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    this.notifyListeners(error);

    if (error.severity === ErrorSeverity.CRITICAL) {
      this.handleCriticalError(error);
    }
  }

  private handleCriticalError(error: CloudError): void {
    if (error.service === CloudServiceType.AWS_COGNITO) {
      console.warn('Error crítico en autenticación. Redirigiendo al login...');
      window.location.href = '/login?reason=auth_error';
    }
  }

  private notifyListeners(error: CloudError): void {
    this.errorListeners.forEach(listener => {
      try {
        listener(error);
      } catch (listenerError) {
        console.error('Error en listener de errores:', listenerError);
      }
    });
  }

  subscribe(callback: ErrorHandlerCallback): () => void {
    this.errorListeners.push(callback);
    return () => {
      this.errorListeners = this.errorListeners.filter(l => l !== callback);
    };
  }

  getErrorLog(): CloudError[] {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }

  async withRetry<T>(
    operation: () => Promise<T>,
    service: CloudServiceType,
    operationName: string,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: CloudError | null = null;
    const context: CloudErrorContext = {
      service,
      operation: operationName,
      timestamp: Date.now(),
    };

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        const err = error as Error;
        lastError = this.createError(
          err.message,
          attempt < maxRetries - 1 ? ErrorSeverity.WARNING : ErrorSeverity.ERROR,
          service,
          { ...context, requestId: `attempt-${attempt + 1}` }
        );
        
        this.handleError(lastError);
        
        if (!lastError.retryable || attempt === maxRetries - 1) {
          throw lastError;
        }

        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }
}

export const cloudErrorHandler = new CloudErrorHandler();

// === ARCHIVO: public/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Aplicación de integración de servicios en la nube con React" />
    <meta name="theme-color" content="#1890ff" />
    <title>Cloud Integration App</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html, body, #root {
        width: 100%;
        height: 100%;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f5f5f5;
      }
      #root {
        display: flex;
        flex-direction: column;
      }
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        gap: 16px;
      }
      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #1890ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .loading-text {
        color: #666;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-text">Cargando aplicación...</div>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: README.md ===
# Cloud Integration Frontend

Aplicación frontend desarrollada con React 19 y TypeScript para la integración de servicios en la nube. El proyecto implementa autenticación, almacenamiento y notificaciones push mediante servicios cloud desacoplados.

## Requisitos Previos

- Node.js 20.x o superior
- npm 9.x o superior

## Instalación

```bash
npm install
```

Este comando instala todas las dependencias definidas en `package.json`, incluyendo React 19, TanStack Query, AWS SDK, Firebase y las herramientas de desarrollo.

## Ejecutar el Proyecto

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo con Vite. La aplicación estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

### Producción

```bash
npm run build
```

Compila el proyecto para producción. El comando ejecuta TypeScript (`tsc`) y luego construye los bundles optimizados con Vite. Los archivos generados se ubican en el directorio `dist/`.

### Vista Previa de Producción

```bash
npm run preview
```

Serve los archivos construidos para producción de manera local.

### Tests

```bash
npm run test
```

Ejecuta los tests unitarios con Vitest.

```bash
npm run test:watch
```

Ejecuta los tests en modo watch para desarrollo.

### Linting

```bash
npm run lint
```

Ejecuta ESLint para verificar el código fuente.

## Estructura del Proyecto

```
cloud-integration-frontend/
├── src/
│   ├── app/                    # Componente raíz y configuración de la aplicación
│   │   ├── App.tsx
│   │   └── app.config.ts
│   ├── features/               # Componentes de características por dominio
│   │   ├── auth/               # Autenticación con servicios cloud
│   │   ├── storage/            # Almacenamiento en la nube
│   │   └── notifications/      # Notificaciones push
│   ├── services/               # Servicios para comunicación con APIs cloud
│   │   ├── authService.ts      # Autenticación (Cognito)
│   │   ├── storageService.ts   # Almacenamiento (S3)
│   │   └── notificationService.ts  # Notificaciones (Firebase)
│   ├── shared/                 # Componentes reutilizables
│   │   └── components/
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # Definiciones de tipos TypeScript
│   ├── config/                 # Configuración centralizada
│   └── utils/                  # Utilidades
├── public/                     # Archivos estáticos públicos
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración de TypeScript
├── vite.config.ts              # Configuración de Vite
└── README.md                   # Este archivo
```

## Arquitectura

El proyecto sigue una arquitectura de capas estándar con servicios de nube desacoplados:

- **Capa de Presentación (`features/`)**: Componentes React que implementan la UI por cada dominio funcional.
- **Capa de Servicios (`services/`)**: Abstracciones sobre las APIs de los proveedores cloud (AWS Cognito, S3, Firebase).
- **Capa de hooks (`hooks/`)**: Lógica reutilizable para consumo de servicios y estado asíncrono.
- **Capa de Tipos (`types/`)**: Definiciones TypeScript para garantizar seguridad en tiempo de compilación.

### Servicios Cloud Integrados

1. **Autenticación**: AWS Cognito para gestión de usuarios y sesiones.
2. **Almacenamiento**: AWS S3 para almacenamiento de objetos.
3. **Notificaciones**: Firebase Cloud Messaging para notificaciones push.

## Convenciones de Código

- Componentes funcionales con TypeScript strict.
- React Hooks para estado y efectos secundarios.
- TanStack Query para gestión de estado asíncrono y caché.
- Zentral para gestión de estado global.
- Idempotencia en gestión de sesiones de usuario.
- Manejo de errores centralizado.

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXX
VITE_COGNITO_CLIENT_ID=XXXXXXXX
VITE_S3_BUCKET_NAME=tu-bucket
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_PROJECT_ID=tu-project-id
```

## Rendimiento

El proyecto está optimizado para manejar:
- 10,000 solicitudes por minuto durante horas pico
- Latencia máxima de 200ms para respuestas críticas
- Core Web Vitals optimizados

## Licencia

MIT
```
