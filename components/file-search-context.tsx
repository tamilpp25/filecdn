'use client';
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
} from '@/components/ui/context-menu';
import {
  ArrowDownToLine,
  BookOpen,
  Clipboard,
  Eye,
  Trash2,
} from 'lucide-react';
import { FileInfo } from './file-download';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';

export interface FileSearchContextProp {
  fileInfo: FileInfo;
}

export function FileSearchContext(context: FileSearchContextProp) {
  const file = context.fileInfo;

  const router = useRouter();

  function handleDelete() {
    axios
      .post(`/api/file/delete`, {
        id: file.id,
      })
      .then((e) => {
        if (e.data && e.data.ok) {
          console.log('Delete success');
          window.location.reload();
        }
      });
  }

  return (
    <ContextMenuContent className="w-auto">
      <ContextMenuItem
        inset
        onClick={() => {
          router.push(`/f/${file.id}`);
        }}
      >
        <span>View</span>
        <ContextMenuShortcut>
          <Eye className="mr-2 h-4 w-4" />
        </ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset onClick={handleDelete}>
        <span>Delete</span>
        <ContextMenuShortcut>
          <Trash2 className="mr-2 h-4 w-4" />
        </ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem
        inset
        onClick={() => {
          navigator.clipboard.writeText(
            `${process.env.NEXTAUTH_URL!}/file/${file.id}`
          );
        }}
      >
        <span>Share</span>
        <ContextMenuShortcut>
          <Clipboard className="mr-2 h-4 w-4" />
        </ContextMenuShortcut>
      </ContextMenuItem>
      <a
        href={`${process.env.NEXTAUTH_URL!}/api/download/${file.id}/${
          file.name
        }`}
        target="_blank"
      >
        <ContextMenuItem inset>
          <span>Preview</span>
          <ContextMenuShortcut>
            <BookOpen className="mr-2 h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </a>
      <a
        href={`${process.env.NEXTAUTH_URL!}/api/download/${file.id}/${
          file.name
        }?dl=1`}
        target="_blank"
      >
        <ContextMenuItem inset className='flex flex-row gap-4'>
          <span>Download</span>
          <ContextMenuShortcut>
            <ArrowDownToLine className="mr-2 h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </a>
    </ContextMenuContent>
  );
}
