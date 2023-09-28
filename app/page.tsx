'use client';
import { Button } from '@/components/ui/button';
import { getUserSession } from '@/lib/session';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  switch (status) {
    case 'unauthenticated':
      return (
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-center text-3xl text-indigo-500">
            You are not logged in!
          </h1>
          <Button onClick={() => signIn()}>Login</Button>
        </div>
      );

    case 'loading':
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-gray-900 h-16 w-16"></div>
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
