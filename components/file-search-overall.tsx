'use client'
import { CloudIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react'
import { Button } from './ui/button';
import { Card, CardHeader, CardDescription, CardContent } from './ui/card';
import { useRouter } from 'next/navigation';
import FileSearch, { FileSearchProps } from './file-search';
import { FileInfo } from './file-download';

interface FileSearchHomeProps {
	user: string,
	files: FileInfo[]
}

export default function FileSearchHome({user, files}: FileSearchHomeProps) {
	const router = useRouter();

	return (
		<div className="h-screen">
			<div className="flex flex-row h-full">
				<div className="w-1/2">
					<div className="ml-5 p-5 py-7">
						<FileSearch files={files}/>
					</div>
				</div>
				<div className="w-1/2 flex my-[20px] flex-col items-center mr-5">
					<div className="flex flex-col gap-3 h-auto py-2">
						<Card className="items-center text-center py-5 flex flex-col gap-2">
							<div className="flex flex-col gap-3 items-center">
								<h1 className="text-center text-3xl">Welcome back</h1>
								<p className="text-center">{user}!</p>
								<Button onClick={() => signOut()}>Logout</Button>
							</div>
						</Card>
						<div>
							<Card className="items-center text-center justify-between flex flex-col gap-2">
								<CardHeader className="text-2xl">
									Ready to start uploading files?
								</CardHeader>
								<CardDescription>
									<CloudIcon />
								</CardDescription>
								<CardContent>
									<Button
										onClick={() => {
											router.push('/upload');
										}}
									>
										Get Started
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
