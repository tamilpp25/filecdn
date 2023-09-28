import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (!req.headers.authorization) {
        res.status(403).json({
            code: -1,
            msg: 'Unauthorized'
        })
        return;
    }

    if (req.headers.authorization?.toString().split(' ')[1] !== process.env.PRIVATE_KEY!) {
        res.status(403).json({
            code: -1,
            msg: 'Invalid key!'
        })
        return;
    }

    try {
        await prisma.whitelist.findUniqueOrThrow({
            where: {
                email: req.query.email as string
            }
        })

        res.status(200).json({ code: 0, is_whitelisted: true })
    } catch {
        res.status(200).json({ code: 0, is_whitelisted: false })
    }

}