import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

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


    const whitelisted = await prisma.whitelist.findMany()

    res.status(200).json({
        code: 0,
        whitelisted: whitelisted
    })

}