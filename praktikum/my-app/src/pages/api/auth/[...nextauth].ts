import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signIn } from "../../../utils/db/servicefirebase";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // fullname: { label: "Full Name", type: "text", placeholder: "John Doe" },
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password)
                    return null;
                const user: any = await signIn(credentials.email);
                
                if (user) {
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordValid) {
                        return {
                            id: user.id,
                            email: user.email,
                            fullname: user.fullname,
                            role: user.role,
                        };
                    }
                }
                return null;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user, account, profile }: any) {
            if (account?.provider === "credentials" && user) {
                token.email = user.email;
                token.fullname = (user as any).fullname;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token } : any) {
            if (token.email) {
                session.user.email = token.email;
            }
            if (token.fullname) {
                session.user.fullname = token.fullname;
            }
            if (token.role) {
                session.user.role = token.role;
            }
            return session;
        }
    },

    pages: {
        signIn: "/auth/login",
    }
}
export default NextAuth(authOptions);
