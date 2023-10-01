'use client';
import Error404 from '@/components/404';
import FileDownload from '@/components/file-download';
import { useParams } from 'next/navigation';

export default function DownloadPage() {
  const param = useParams();

  if (!param) {
    return (
      <>
        <Error404 />
      </>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {/* <FileDownload fileInfo={{ id: param.file as string }} /> */}
    </div>
  );
}
