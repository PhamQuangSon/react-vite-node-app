import React, { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import io from "socket.io-client";

import { Card } from "@/components/ui/card";

interface NotificationsProps {
  id: number;
  message: string;
}

// const notifications = [
//   { id: 1, message: "You have a new follower!" },
//   { id: 2, message: "Your post has been liked!" },
//   { id: 3, message: "You have a new comment!" },
// ];

const SOCKET_SERVER_URL = "http://localhost:4000"; // Replace with your server URL

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationsProps[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    // Listen for notifications from the server
    socket.on("notification", (notification: NotificationsProps) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Card className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative w-full">
        <div className="w-full md:w-3/4">
          <h4 className="text-xl font-extrabold leading-tight text-gray-900 py-1 lg:text-2xl dark:text-white my-2 relative animate animate-fade-up animate-duration-1000 animate-delay-300">
            <span>Notifications</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-sky-400 dark:bg-white opacity-25"></span>
          </h4>
        </div>
        <div>
          <button className="text-sm p-2 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white">
            <Check
              size={16}
              strokeWidth={1.25}
              className="dark:text-white mr-2"
            />
            Mark all as read
          </button>
        </div>
      </div>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="notification-card animate animate-fade-right animate-duration-1000 animate-delay-300"
        >
          <Bell
            size={16}
            strokeWidth={1.25}
            className="dark:text-white inline mr-2"
          />
          {notification.message}
        </div>
      ))}
    </Card>
  );
};

export default Notifications;
