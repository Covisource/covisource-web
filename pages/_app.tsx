import React from "react";
import "~styles/globals.css";
import { Provider } from "next-auth/client";
import { HereContextProvider } from "~contexts/HereContext";

function MyApp({ Component, pageProps }) {
  return (
    <HereContextProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </HereContextProvider>
  );
}

export default MyApp;
