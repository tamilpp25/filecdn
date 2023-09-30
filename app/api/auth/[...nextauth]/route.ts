import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import Discord from "next-auth/providers/discord"
import { prisma } from "@/lib/prisma"

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!

export const authOption: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        Discord({
            clientId: DISCORD_CLIENT_ID,
            clientSecret: DISCORD_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({user, profile}) {
            if (!profile?.email){
                throw new Error("No profile!")
            }

            const whitelist = await prisma.whitelist.findUnique({
                where: {
                    email: profile.email
                }
            })

            if (!whitelist) {
                return false
            }

            await prisma.user.upsert({
                where: {
                    email: profile.email
                },
                create: {
                    email: profile.email,
                    name: user.name,
                    avatar: user.image
                },
                update: {
                    name: user.name
                }
            })

            return true
        }
    },
    secret: NEXTAUTH_SECRET,
    pages:{
        signIn: '/signin',
        error: '/auth/error'
    }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }