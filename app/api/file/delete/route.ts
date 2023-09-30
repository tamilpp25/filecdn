

import { NextResponse } from "next/server";
import fs from "fs";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";

interface DeleteBody {
    id: string,
}

export async function POST(req: Request) {
    const session = await getServerSession(authOption);
    const body = await req.json() as DeleteBody

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

    const file = await prisma.file.delete({
        where: {
            id: body.id
        }
    })

    if (!file) {
        return NextResponse.json({
            ok: false,
            msg: 'File does not exist!'
        })
    }

    if (user.id !== file.userId) {
        return NextResponse.json({
            ok: false,
            msg: 'Cannot delete files by other users!'
        })
    }

    fs.unlinkSync(`uploads/${file.id}.${file.name.split('.')[file.name.split('.').length - 1]}`)

    return NextResponse.json({
        ok: true,
        msg: "Success"
    });
}
