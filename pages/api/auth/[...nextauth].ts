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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/newUser`,
          {
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
          }
        ).then((res) => res.json());

        if (res.success === false) {
          if (res.code === "user_exists") {
            console.log("User exists");
            return true; // we can let the login continue, because the user exists, and can login
          }
          
          // handle error
        } else {
          console.log("User Created");
          return true;
        }
      } else {
        // handle error
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
      return user;
    },
  },
});
