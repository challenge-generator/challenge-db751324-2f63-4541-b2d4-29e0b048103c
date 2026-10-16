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