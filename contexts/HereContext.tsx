import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const HereContext = React.createContext(null);

export const useHereContext = () => useContext(HereContext);

export const HereContextProvider = ({ children }) => {
  const [hereToken, setHereToken] = useState<string>("");

  useEffect(() => {
    const retrieveHereToken = async () => {
      try {
        const res = await axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/location/getHereOauthToken`,
            {
              key: process.env.NEXT_PUBLIC_HERE_OAUTH_KEY,
              secret: process.env.NEXT_PUBLIC_HERE_OAUTH_SECRET,
            }
          )
          .then((res) => res.data);

        if (res.success !== true || !res.data.access_token) {
          // if there server doesnt return anything then set an error
          console.error(`Internal Error: ${res.data.message}`);

          // handle error
        } else {
          // the server returns the token
          setHereToken(res.data.access_token);
        }
      } catch (err) {
        // server error
        console.error(`Internal Error: ${err.message}`);

        // handle error
      }
    };
    retrieveHereToken();
  }, []);

  return (
    <HereContext.Provider value={hereToken}>{children}</HereContext.Provider>
  );
};
