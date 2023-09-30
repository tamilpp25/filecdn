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
import { formatSize } from '@/lib/utils';

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
          <p>{formatSize(file.size)}</p>
        </CardContent>
        <CardFooter className="flex flex-row gap-2">
          <a
            href={`${process.env.NEXTAUTH_URL}/api/download/${file.id}/${file.name}?dl=1`}
            target="_blank"
          >
            <Button
              className="bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800"
              variant={'secondary'}
            >
              Click to download file
            </Button>
          </a>
          <Button
            className="bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800"
            variant={'secondary'}
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXTAUTH_URL!}/file/${file.id}`
              );
            }}
          >
            <Clipboard />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileCard;
