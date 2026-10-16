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