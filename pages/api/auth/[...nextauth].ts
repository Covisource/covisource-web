import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";
import axios from "axios";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === "google" || account.provider === "twitter") {
        // sign the user up if they arent yet
        const res = await fetch("http://localhost:8000/user/newUser", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            user: {
              id: account.id,
              name: user.name,
              email: user.email,
              provider: account.provider,
            },
          }),
        }).then((res) => res.json());

        if (res.success === false) {
          if (res.code === "user_exists") {
            console.log("User exists");
            return true; // we can let the login continue, because the user exists, and can login
          }
          return `/signin-error?message=${res.mesage}`;
        } else {
          console.log("User Created");
          return true;
        }
      } else {
        return "/signin-error";
      }
    },
    async jwt(token, user, account, profile, isNewUser) {
      // generate a jwt and save it
      if (!token.jwt) {
        const jwtToken = jwt.sign(
          {
            id: `${account?.provider}_${account?.id}`,
          },
          "hi"
        );
        token.jwt = jwtToken;
      }
      return token;
    },
    async session(session, user) {
      let res;
      try {
        res = await fetch("http://localhost:8000/user/fetchUser", {
          headers: {
            Authorization: `token ${user.jwt}`,
          },
        }).then((res) => res.json());
      } catch (err) {
        console.error(err);
      }
      if (res.data?.success) {
        return {
          ...user,
          coordinates: [...res.data.location.coordinates],
        };
      }

      // no user has logged in yet
      return user;
    },
  },
});
