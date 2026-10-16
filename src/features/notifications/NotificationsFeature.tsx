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