'use client';
import FileSearch from '@/components/file-search';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { CloudIcon, Disc3Icon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        <div className="h-screen">
          <div className="flex flex-row h-full">
            <div className="w-1/2">
              <div className="ml-5 p-5 py-7">
                <FileSearch />
              </div>
            </div>
            <div className="w-1/2 flex my-[20px] flex-col items-center mr-5">
              <div className="flex flex-col gap-3 h-auto py-2">
                <Card className="items-center text-center py-5 flex flex-col gap-2">
                  <div className="flex flex-col gap-3 items-center">
                    <h1 className="text-center text-3xl">
                      Welcome back
                    </h1>
                    <p className="text-center">{session.user!.name}!</p>
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
      );
  }
}
