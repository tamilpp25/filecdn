import Error404 from '@/components/404';
import FileDownload, { FileInfo } from '@/components/file-download';
import prisma from '@/lib/prisma';
import { formatSize } from '@/lib/utils';
import { Metadata } from 'next';

interface DownloadPageProps {
  params: {
    file: string;
  }
}

export async function generateMetadata({ params }: DownloadPageProps): Promise<Metadata> {

  if (!params.file) return {};

  const file = await prisma.file.findUnique({
    where: {
      id: params.file
    }
  })

  if (!file) return {}

  return {
    title: `${file.name} - FileCDN`,
    openGraph: {
      title: `${file.name} - FileCDN`,
      description: `${formatSize(file.size.toString())} file
      Host and share files easily!`,
      url: `${process.env.NEXTAUTH_URL}/file/${file.id}`,
    },
  }
}

export default async function DownloadPage({ params }: DownloadPageProps) {

  if (!params.file) {
    return <Error404 />
  }

  const file = await prisma.file.findUnique({
    where: {
      id: params.file
    }
  })

  if (!file) {
    return <Error404 />
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {/* <FileDownload fileInfo={file} /> */}
      {/* <div>{JSON.stringify(fileInfo)}</div> */}
      <FileDownload file={{
        createdAt: file.createdAt,
        id: file.id,
        name: file.name,
        size: file.size.toString()
      }} />
    </div>
  );
}