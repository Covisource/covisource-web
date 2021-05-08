import React from "react";
import "~styles/globals.css";
import { Provider } from "next-auth/client";
import { HereContextProvider } from "~contexts/HereContext";
import { NotificationContextProvider } from "~contexts/NotificationContext";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <HereContextProvider>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </HereContextProvider>
    </NotificationContextProvider>
  );
}

export default MyApp;
