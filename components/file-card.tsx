import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Clipboard } from 'lucide-react';
import { Button } from './ui/button';
import { RedirectType, redirect } from 'next/navigation';

export interface FileCardProp {
  id: string;
  size: number;
  name: string;
}

const FileCard = ({ file }: { file: FileCardProp }) => {
  return (
    <div>
      <Card className="h-auto w-96 items-center flex flex-col text-center">
        <CardHeader>
          <CardTitle>File Uploaded!</CardTitle>
          <CardDescription>{file.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Size: {file.size} bytes</p>
        </CardContent>
        <CardFooter className='flex flex-row gap-2'>
          <Button
            className="bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800"
            variant={'secondary'}
            onClick={() => redirect(`/f/${file.id}`)}
          >
            Click to download file
          </Button>
          <Button
            className="bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800"
            variant={'secondary'}
            onClick={() => redirect(`/f/${file.id}`, RedirectType.push)}
          >
            <Clipboard />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileCard;
