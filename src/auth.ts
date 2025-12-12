import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                await connectDB();
                if (!credentials?.email || !credentials?.password) return null;

                const user = await User.findOne({ email: credentials.email }).select("+password");
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password as string);
                if (!passwordsMatch) return null;

                return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
})
