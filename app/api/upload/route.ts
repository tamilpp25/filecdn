import { NextResponse } from "next/server";
import fs from "fs";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

interface UploadResponse {
	id: string;
	size: number;
	name: string;
}

export async function POST(req: Request) {

	const session = await getServerSession(authOption);

	if (!session) {
		return NextResponse.json({
			ok: false,
			msg: "Session not found"
		})
	}

	const responseFiles: UploadResponse[] = []

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

	const data = await req.formData();
	for (const entry of Array.from(data.entries())) {
		const [filename, value] = entry;
		const blob = value as unknown as Blob;
		const rawFile = value as File
		const buffer = await blob.arrayBuffer();

		const file = await prisma.file.create({
			data: {
				name: filename,
				size: blob.size,
				userId: user.id,
				type: rawFile.type
			}
		})

		responseFiles.push({
			id: file.id,
			name: filename,
			size: blob.size
		})

		fs.writeFileSync(`uploads/${file.id}.${filename.split('.')[filename.split('.').length - 1]}`, Buffer.from(buffer));
	}

	return NextResponse.json({ ok: true, data: responseFiles });
}
