'use client'
import FileUpload from '@/components/file-upload';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Upload() {
  const {data: session, status}  = useSession();

  if (!session) {
		redirect('/signin')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <FileUpload />
    </div>
  );
}
