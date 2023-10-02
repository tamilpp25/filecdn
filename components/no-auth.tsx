'use client'
import Image from 'next/image'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

export default function NoAuth() {
	return (
		<div className="flex flex-col justify-center items-center gap-3 h-screen">
			<div className="flex flex-row items-center gap-3">
				<Image src="/assets/logo.png" alt="logo" height={50} width={50} />
				<h1 className="text-6xl font-bold">FileCDN</h1>
			</div>
			<h2 className="text-lg text-zinc-900 dark:text-zinc-400">Host and share files easily!</h2>
			<h1 className="text-center text-2xl text-zinc-900 dark:text-zinc-400">
				Authentication is required to access further content!
			</h1>
			<Button className="h-auto w-36 text-base" onClick={() => signIn()}>
				Login
			</Button>
		</div>
	)
}
