import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";

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
        const res = await fetch(`${process.env.SERVER_URL}/auth/newUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
      const jwtToken = jwt.sign(
        {
          id: `${account?.provider}_${account?.id}`,
        },
        "hi"
      );
      token.jwt = jwtToken;
      return token;
    },
    async session(session, token) {
      return session;
    },
  },
});
