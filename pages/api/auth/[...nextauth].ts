import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import authorizeUser from "services/users/authorize";

const prisma = new PrismaClient();

type UserId = {
  id: number | undefined;
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user, user:email",
    }),
    Providers.Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const user = await authorizeUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (user) {
          return {
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
            name: user.name,
            role: user.role,
            image: user.image,
            skill: user.skill,
            timezone: user.timezone,
            biogram: user.biogram,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    signIn: async (profile, account) => {
      if (account?.provider === "github") {
        const res = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${account.accessToken}`,
          },
        });
        const emails = await res.json();
        if (!emails || emails.length === 0) {
          return false;
        }
        const sortedEmails = emails.sort(
          (a: { primary: number }, b: { primary: number }) =>
            b.primary - a.primary
        );
        profile.email = sortedEmails[0].email;
      }

      return true;
    },
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async (session, user: UserId) => {
      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

      if (dbUser && dbUser.role) {
        if (!session.user) {
          session.user = {};
        }
        (session.user as any).role = dbUser.role;
      }

      return session;
    },
  },

  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXT_AUTH_SECRET,
  },

  adapter: Adapters.Prisma.Adapter({ prisma }),
});
