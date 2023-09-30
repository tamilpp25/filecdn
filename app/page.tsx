'use client';
import { Button } from '@/components/ui/button';
import { Disc3Icon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession();

  switch (status) {
    case 'unauthenticated':
      return (
        <div className="flex flex-col justify-center items-center gap-3 h-screen">
          <div className="flex flex-row items-center gap-3">
            <Image src="/favicon.ico" alt="logo" height={65} width={65} />
            <h1 className="text-7xl font-bold">FileCDN</h1>
          </div>
          <h2>host files in the easiest way possible!</h2>
          <h1 className="text-center text-3xl text-indigo-500">
            You are not logged in!
          </h1>
          <Button onClick={() => signIn()}>Login</Button>
        </div>
      );

    case 'loading':
      return (
        <div className="flex items-center justify-center h-screen">
          <Disc3Icon className="animate-spin h-10 w-10" />
        </div>
      );

    case 'authenticated':
      return (
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-center text-3xl text-indigo-500">
            Welcome back!
          </h1>
          <p className="text-center">{session.user!.name}</p>
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      );
  }
}
