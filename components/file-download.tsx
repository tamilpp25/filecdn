import { redirect, RedirectType } from 'next/navigation';
import { Button } from './ui/button';
import { Clipboard } from 'lucide-react';
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
      <div className="flex flex-row justify-center items-center">
        Loading...
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
    <>
      <Card className="h-auto w-96 items-center flex flex-col text-center">
        <CardHeader>
          <CardTitle>{file.name}</CardTitle>
          <CardDescription>{file.size} bytes</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-3'>
          <Button
            className="bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800"
            variant={'secondary'}
            onClick={() => redirect(`/api/download/${file.id}/${file.name}`)}
          >
            Download
          </Button>
          <Button
            className="flex flex-row items-center gap-2 bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800"
            variant={'secondary'}
            onClick={() => redirect(`/f/${file.id}`, RedirectType.push)}
          >
            <Clipboard />
            <span>Copy link to share</span>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-row gap-2">
          <a>Uploaded on {new Date(file.createdAt).toUTCString()}</a>
        </CardFooter>
      </Card>
    </>
  );
};

export default FileDownload;
