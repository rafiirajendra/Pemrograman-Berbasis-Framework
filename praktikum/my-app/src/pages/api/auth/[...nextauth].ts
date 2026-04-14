import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signIn } from "../../../utils/db/servicefirebase";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { signInWithOAuth } from "../../../utils/db/servicefirebase";

const googleClientId =
    process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CILIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const githubClientId = process.env.GITHUB_CLIENT_ID || "";
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || "";

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
        }),
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
        }),
        GithubProvider({
            clientId: githubClientId,
            clientSecret: githubClientSecret,
        })
    ],

    callbacks: {
        async jwt({ token, user, account, profile }: any) {
            if (account?.provider === "credentials" && user) {
                token.email = user.email;
                token.fullname = (user as any).fullname;
                token.name = (user as any).fullname;
                token.role = user.role;
            }
            
            if (account?.provider === "google" || account?.provider === "github") {
                const resolvedFullname =
                    user?.name ||
                    profile?.name ||
                    token?.fullname ||
                    token?.name ||
                    "";
                const data = {
                    fullname: resolvedFullname,
                    email: user?.email || token?.email,
                    image: user?.image || token?.image,
                    type: account.provider,
                };

                token.fullname = data.fullname;
                token.name = data.fullname;
                token.email = data.email;
                token.image = data.image;
                token.type = data.type;

                const result = await signInWithOAuth(data);
                if (result.status) {
                    token.fullname = result.data?.fullname ?? data.fullname;
                    token.name = result.data?.fullname ?? data.fullname;
                    token.email = result.data?.email ?? data.email;
                    token.image = result.data?.image ?? data.image;
                    token.type = result.data?.type ?? data.type;
                    token.role = result.data?.role ?? token.role;
                }
            }
            return token;
        },

        async session({ session, token }: any) {
            if (token.email) {
                session.user.email = token.email;
            }
            if (token.fullname) {
                session.user.fullname = token.fullname;
            }
            if (token.name) {
                session.user.name = token.name;
            }
            if (token.image) {
                session.user.image = token.image;
            }
            if (token.type) {
                session.user.type = token.type;
            }
            if (token.role) {
                session.user.role = token.role;
            }
            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    }
}
export default NextAuth(authOptions);
