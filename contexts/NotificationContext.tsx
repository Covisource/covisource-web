import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const NotificationContext = React.createContext(null);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }) => {
  return (
    <NotificationContext.Provider value={null}>
      {children}
    </NotificationContext.Provider>
  );
};
