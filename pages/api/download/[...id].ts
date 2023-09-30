import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query;

    if (!id) {
        return res.status(404).json({
            ok: false,
            msg: 'Missing params'
        });
    }

    if (!id && id.length != 2) {
        return res.status(404).json({
            ok: false,
            msg: 'Invalid params'
        });
    }

    const fileId = id[0]
    const fileName = id[1]

    const file = await prisma.file.findUnique({
        where: {
            id: fileId,
            name: fileName
        }
    })

    if (!file) {
        return res.status(404).json({
            ok: false,
            msg: 'File not found'
        });
    }


    const fileContent = fs.createReadStream(`uploads/${file.id}.${file.name.split('.')[file.name.split('.').length - 1]}`)

    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`)
    res.setHeader("Content-Type", 'application/octet-stream')
    fileContent.pipe(res);
}