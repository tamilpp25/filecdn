import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

interface UpdateBody {
    addEmails: string[]
    removeEmails: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const body = req.body as UpdateBody

    try {
        await prisma.whitelist.deleteMany({
            where: {
                email: {
                    in: body.removeEmails
                }
            }
        })

        for (const email of body.addEmails) {
            await prisma.whitelist.create({
                data: {
                    email: email
                }
            })
        }

        res.status(200).json({ code: 0, msg: "OK" })
    } catch {
        res.status(200).json({ code: 0, is_whitelisted: false })
    }

}