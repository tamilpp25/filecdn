import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const id = req.query.id;
    const dl = req.query.dl;

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

    const path = `uploads/${file.id}.${file.name.split('.')[file.name.split('.').length - 1]}`

    if (!fs.existsSync(path)) {
        res.status(404).json({
            ok: false,
            msg: 'File is missing'
        })
        return
    }

    const fileContent = fs.createReadStream(path)

    if (dl && dl as string === '1') {
        res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`)
    }

    res.setHeader("Content-Type", file.type)
    fileContent.pipe(res);
}