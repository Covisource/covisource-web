import axios from "axios";
import { useRouter } from "next/router";
export const retrieveHereToken = async () => {
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
      return {
          error: true,
          message: `Internal Error: ${res.data.message}`
      }
    } else {
      // the server returns the token
      return {
          error: false,
          token: res.data.access_token
      };
    }
  } catch (err) {
    // server error
    console.error(`Internal Error: ${err.message}`);
    return {
        error: true,
        message: `Internal Error: ${err.message}`
    }
  }
};
