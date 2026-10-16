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