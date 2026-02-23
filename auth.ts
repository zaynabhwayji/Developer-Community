import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Connection from "@/lib/mongodb";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({ user }) {
      await Connection();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          avatar: user.image || "/avatar.png",
        });
      }

      return true;
    },
      async jwt({ token }) {
      await Connection();

      const dbUser = await User.findOne({ email: token.email });

      if (dbUser) {
        token.id = dbUser._id.toString(); 
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

});
