import { File } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { FileInfo } from './file-download';
import { FileSearchContext } from './file-search-context';
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu';

export interface FileSearchProps {
  files: FileInfo[]
}

export default function FileSearch({ files }: FileSearchProps) {

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No files found.</CommandEmpty>
        <CommandGroup heading="Your Uploads">
          {files.length > 0 ? (
            <>
              {files.map((e) => {
                return (
                  <a
                    key={e.id}
                    href={`${process.env.NEXTAUTH_URL}/file/${e.id}`}
                  >
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <CommandItem className="">
                          <File className="mr-2 h-4 w-4" />
                          <span className="">{e.name}</span>
                        </CommandItem>
                      </ContextMenuTrigger>
                      <FileSearchContext fileInfo={e} />
                    </ContextMenu>
                  </a>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
