'use client';
import Head from 'next/head';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default function SignIn() {
  const { data: session, status } = useSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto bg-slate-950 h-2/3 w-80 dark:bg-slate-50 rounded-md lg:grid-cols-2 flex flex-col justify-center">
        <div className="text-center py-10">
          <section className="w-3/4 mx-auto flex flex-col gap-10">
            <div className="title flex flex-col items-center">
              <Image
                className="flex flex-col mx-auto"
                src="/favicon.png"
                width={50}
                height={50}
                alt="logo"
              />
              <h1 className="text-white dark:text-gray-800 text-4xl font-bold py-4">
                FileCDN
              </h1>
              <p className="w-full text-gray-100 dark:text-gray-600">
                Welcome to FileCDN Authentication. To access your account, log
                in using one of the providers below. If you do not have an
                account, please contact your administrator to create one.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button variant={'outline'} onClick={() => signIn('discord', {
                callbackUrl: '/'
              })}>
                <span className="flex items-center gap-1">
                  <Image
                    src="/assets/discord.svg" // Directly specify the path to the Discord icon
                    alt="Discord"
                    width={18} // Adjust the width as needed
                    height={18} // Adjust the height as needed
                    className="mr-2 dark:fill-white" // Adjust margin as needed
                  />
                  Sign in with Discord
                </span>
              </Button>
              <Button variant={'outline'} onClick={() => signIn('google')}>
                <span className="flex items-center gap-1">
                  <Image
                    src="/assets/google.svg" // Directly specify the path to the Google icon
                    alt="Google"
                    width={17} // Adjust the width as needed
                    height={17} // Adjust the height as needed
                    className="mr-2 z-20 dark:fill-white" // Adjust margin as needed
                  />
                  Sign in with Google
                </span>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
