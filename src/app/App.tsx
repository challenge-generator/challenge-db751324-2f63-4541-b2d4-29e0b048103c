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