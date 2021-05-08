import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// components
import Notification from "~components/Notification";

const NotificationContext = React.createContext(null);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }) => {
  return (
    <NotificationContext.Provider value={null}>
      <div className="absolute bottom-4 right-4">
        <Notification title="lol maybe idk" />
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
