import { redirect, RedirectType } from 'next/navigation';
import { Button } from './ui/button';
import { Clipboard, CloudIcon, Disc, Disc3Icon, Download } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useEffect, useState } from 'react'; // Import useEffect and useState
import Error404 from './404';
import { getFileInfo } from '@/lib/fetch-file';
import Link from 'next/link';
import { formatSize } from '@/lib/utils';

export interface FileDownloadProp {
  id: string;
}

interface FileInfo {
  name: string;
  id: string;
  createdAt: Date;
  size: string;
}

const FileDownload = ({ fileInfo }: { fileInfo: FileDownloadProp }) => {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch file data asynchronously when the component mounts
    const fetchFileData = async () => {
      try {
        const fetchedFile = await getFileInfo(fileInfo.id);
        setFile(fetchedFile.data);
      } catch (error) {
        console.error('Error fetching file data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchFileData();
    // fetchFromDb(fileInfo.id);
  }, [fileInfo.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Disc3Icon className="animate-spin h-10 w-10" />
      </div>
    );
  }

  if (!file) {
    return (
      <>
        <a>{fileInfo.id}</a>
        <Error404 />
      </>
    );
  }

  return (
    <div className="gap-3 h-screen w-screen items-center flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-4">
          <CloudIcon className="h-16 w-16" />
          <h1 className="text-5xl">FileCDN</h1>
        </div>
        <h2 className="text-gray-500">Host and share files easily!</h2>
      </div>
      <Card className="h-auto w-3/5 items-center flex flex-col text-center">
        <CardHeader>
          <CardTitle>{file.name}</CardTitle>
          <CardDescription>{formatSize(file.size)}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <a href={`${process.env.NEXTAUTH_URL}/api/download/${file.id}/${file.name}?dl=1`} target='_blank'>
            <Button
              className="flex flex-row items-center gap-2 bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800"
              variant={'secondary'}
            >
              <Download />
              Download
            </Button>
          </a>
          <Button
            className="flex flex-row items-center gap-2 bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800"
            variant={'secondary'}
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXTAUTH_URL!}/file/${file.id}`
              );
            }}
          >
            <Clipboard />
            <span>Copy link to share</span>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-row gap-2">
          <a>Uploaded on {new Date(file.createdAt).toUTCString()}</a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileDownload;