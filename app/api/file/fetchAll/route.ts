

import { NextResponse } from "next/server";
import fs from "fs";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {

    const session = await getServerSession(authOption);

    if (!session) {
        return NextResponse.json({
            ok: false,
            msg: "Session not found"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!
        }
    })

    if (!user) {
        return NextResponse.json({
            ok: false,
            msg: "User not found"
        })
    }

    const files = await prisma.file.findMany({
        where: {
            userId: user.id
        }
    })

    return NextResponse.json({
        ok: true, data: files.map(e => {
            return {
                name: e.name,
                size: new String(e.size),
                id: e.id,
                createdAt: e.createdAt,
                type: e.type
            }
        })
    });
}
