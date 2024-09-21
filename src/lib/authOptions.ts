import { NextAuthOptions, User as NextAuthUser } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "taskflow0w";

// Define the authentication options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID || "",
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET || "",
    }),
    /* CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        await ensureDbConnected();

        if (!credentials) {
          return null;
        }

        const { username, password } = credentials;

        const user = await User.findOne({ username });

        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({ username, password: hashedPassword });
          let savedUser = await newUser.save();
          return {
            id: savedUser._id.toString(),
            email: savedUser.username,
          };
        } else {
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return null;
          }
          return {
            id: user._id.toString(),
            email: user.username,
          };
        }
      },
    }), */
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          // id: token.id
          email: token.email,
        };
      }
      return session;
    },
  },
};
