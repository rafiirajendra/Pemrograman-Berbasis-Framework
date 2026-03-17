import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                fullname: { label: "Full Name", type: "text", placeholder: "John Doe" },
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user : any = {
                    id: 1,
                    fullname: credentials?.fullname,
                    email: credentials?.email,
                    password: credentials?.password
                }
                if (user) {
                    return user;
                } else {
                    return null;    
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account?.provider === "credentials" && user) {
                token.email = user.email;
                token.fullname = (user as any).fullname;
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
            return session;
        }
    }
}
export default NextAuth(authOptions);
