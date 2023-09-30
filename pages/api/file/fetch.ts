import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query;

    if (!id) {
        return res.status(404).json({
            ok: false,
            msg: 'Missing params'
        });
    }

    if (!id && id.length != 1) {
        return res.status(404).json({
            ok: false,
            msg: 'Invalid params'
        });
    }

    const file = await prisma.file.findUnique({
        where: {
            id: id as string,
        }
    })

    if (!file) {
        return res.status(404).json({
            ok: false,
            msg: 'File not found'
        });
    }


    res.status(200).json({
        ok: true,
        data: {
            id: file.id,
            name: file.name,
            createdAt: file.createdAt,
            size: new String(file.size)
        }
    })
}