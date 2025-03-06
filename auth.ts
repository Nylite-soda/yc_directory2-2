import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
import { generateUsername } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile) {
        throw new Error("Profile is undefined");
      }

      const { sub, name, email, picture } = profile;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: sub,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: sub,
          name: name,
          username: generateUsername(name || ""),
          email: email,
          image: picture,
          bio: "",
        });
      }

      return true;
    },

    async jwt({ token, profile }) {
      if (profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: profile.sub,
          });

        token.id = user?._id;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },

  //   debug: true, // Optional: helps with debugging
});
