import { useState, useEffect } from 'react';
import { notificationAPI } from '../services/api';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await notificationAPI.getNotifications();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const styles = {
    container: {
      position: 'relative'
    },
    bell: {
      position: 'relative',
      cursor: 'pointer',
      fontSize: '1.5rem',
      padding: '0.5rem'
    },
    badge: {
      position: 'absolute',
      top: '0',
      right: '0',
      backgroundColor: 'var(--danger)',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 'bold'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: '0',
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      boxShadow: 'var(--shadow)',
      width: '320px',
      maxHeight: '400px',
      overflowY: 'auto',
      zIndex: 1000,
      marginTop: '0.5rem'
    },
    header: {
      padding: '1rem',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    notification: {
      padding: '1rem',
      borderBottom: '1px solid var(--border-color)',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    unread: {
      backgroundColor: 'rgba(52, 152, 219, 0.1)'
    },
    message: {
      fontSize: '0.9rem',
      color: 'var(--text-primary)',
      marginBottom: '0.25rem'
    },
    time: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    },
    markAllButton: {
      fontSize: '0.85rem',
      color: 'var(--accent)',
      cursor: 'pointer',
      border: 'none',
      background: 'none'
    },
    empty: {
      padding: '2rem',
      textAlign: 'center',
      color: 'var(--text-secondary)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bell} onClick={() => setShowDropdown(!showDropdown)}>
        🔔
        {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
      </div>

      {showDropdown && (
        <div style={styles.dropdown}>
          <div style={styles.header}>
            <strong>Notifications</strong>
            {unreadCount > 0 && (
              <button style={styles.markAllButton} onClick={handleMarkAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <div style={styles.empty}>No notifications</div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                style={{
                  ...styles.notification,
                  ...(notif.read ? {} : styles.unread)
                }}
                onClick={() => !notif.read && handleMarkAsRead(notif._id)}
              >
                <div style={styles.message}>{notif.message}</div>
                <div style={styles.time}>
                  {new Date(notif.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
