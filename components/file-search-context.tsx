import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { FileInfo } from './file-download';
import { CommandItem } from 'cmdk';
import { File } from 'lucide-react';
import { redirect } from 'next/navigation';

export interface FileSearchContextProp {
  fileInfo: FileInfo;
}

export function FileSearchContext(context: FileSearchContextProp) {
  const file = context.fileInfo;

  return (
    <ContextMenuContent className="w-52">
      <ContextMenuItem
        inset
        onClick={() => redirect(`${process.env.NEXTAUTH_URL}/file/${file.id}`)}
      >
        View
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset disabled>
        Delete
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem
        inset
        onClick={() => {
          navigator.clipboard.writeText(
            `${process.env.NEXTAUTH_URL!}/file/${file.id}`
          );
        }}
      >
        Share
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <a
        href={`${process.env.NEXTAUTH_URL!}/api/download/${file.id}/${
          file.name
        }`}
        target='_blank'
      >
        <ContextMenuItem inset>
          Preview
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </a>
      <a
        href={`${process.env.NEXTAUTH_URL!}/api/download/${file.id}/${
          file.name
        }?dl=1`}
        target='_blank'
      >
        <ContextMenuItem inset>
          Download
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </a>
    </ContextMenuContent>
  );
}
