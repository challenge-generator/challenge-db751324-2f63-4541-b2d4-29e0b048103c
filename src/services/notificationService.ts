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