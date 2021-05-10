import React from "react";
import "~styles/globals.css";
import { Provider } from "next-auth/client";
import { HereContextProvider } from "~contexts/HereContext";
import { PopupOpenProvider } from "~contexts/PopupOpenContext";

function MyApp({ Component, pageProps }) {
  return (
    <PopupOpenProvider>
      <HereContextProvider>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </HereContextProvider>
    </PopupOpenProvider>
  );
}

export default MyApp;
