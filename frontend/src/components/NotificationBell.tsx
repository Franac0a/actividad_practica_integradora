import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getNotifications } from "../api/notifications.api";

function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function loadUnreadCount() {
      try {
        const notifications = await getNotifications();

        const unread = notifications.filter(
          (notification) => !notification.read
        ).length;

        setUnreadCount(unread);
      } catch {
        setUnreadCount(0);
      }
    }

    void loadUnreadCount();

    const interval = setInterval(() => {
      void loadUnreadCount();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Link to="/notifications">
      Notificaciones ({unreadCount})
    </Link>
  );
}

export default NotificationBell;