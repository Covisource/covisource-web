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
        return true;
      } else {
        return "/signin-error";
      }
    },
    async jwt(token, user, account, profile, isNewUser) {
      // generate a jwt and save it
      if (account.id) {
        const jwtToken = jwt.sign(
          {
            id: account.id,
          },
          "hi"
        );
        console.log(jwtToken);
        token.jwt = jwtToken;
      }
      console.log(token)
      return token;
    },
  },
});
