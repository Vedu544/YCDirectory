import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { client } from "./sanity/lib/client";
import { server } from "@/sanity/lib/server";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the user exists in Sanity
      const existingUser = await client.fetch(AUTHOR_BY_ID_QUERY, {
        id: profile?.id,
      });

      console.log({ existingUser, profile, user });

      if (!existingUser) {
        // User not found in Sanity, create a new user document
        await server.create({
          _type: "author",
          id: profile?.id,
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
        });
      }

      // Return true to continue the sign-in process
      return true;
    },
    async jwt({ token, account, profile }) {
      // Add profile id to the JWT token on sign-in
      if (account && profile) {
        // Extend the token with the GitHub profile id
        token.id = profile.id;
      }
      return token;
    },

    async session({ session, token }) {
      // Pass the profile id from the token to the session
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});