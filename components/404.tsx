'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Error404 = () => {
  const { data: session, status } = useSession();

  return (
    <div className='flex flex-col items-center justify-center gap-20 py-20'>
      <div className="">
        <Link href="/" className="flex flex-col items-center">
          <Image
            className="m-3"
            height={50}
            width={50}
            src="/assets/logo.png"
            alt="logo"
          />
          <h1 className="font-bold text-5xl">FileCDN</h1>
        </Link>
      </div>
      <div className="items-center flex flex-col gap-3">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-lg text-center">
          The content you requested could not be found
        </h2>
        <div className="flex flex-row gap-3 items-center text-center justify-center text-zinc-500">
          <Link href="/">Home</Link>
          {session ? (
            <></>
          ) : (
            <>
              <h1>|</h1>
              <Link href="/signin">Login</Link>
            </>
          )}
          <h1>|</h1>
          <Link href="https://github.com/tamilpp25/filecdn">Github</Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
