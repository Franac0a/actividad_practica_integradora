import { useEffect, useState } from "react";

import {
  getNotifications,
  markNotificationAsRead,
} from "../api/notifications.api";

import type { Notification } from "../types";

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al cargar las notificaciones"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadNotifications();
  }, []);

  async function handleMarkAsRead(id: number) {
    try {
      await markNotificationAsRead(id);

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la notificación"
      );
    }
  }

  if (loading) {
    return <p>Cargando notificaciones...</p>;
  }

  return (
    <main>
      <h1>Notificaciones</h1>

      {error && <p>{error}</p>}

      {notifications.length === 0 ? (
        <p>No tenés notificaciones.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <p>{notification.message}</p>

              <p>
                Estado:{" "}
                {notification.read ? "Leída" : "No leída"}
              </p>

              {!notification.read && (
                <button
                  onClick={() =>
                    handleMarkAsRead(notification.id)
                  }
                >
                  Marcar como leída
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default NotificationsPage;