import { File, Trash2Icon, Link2Icon } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { FileInfo } from './file-download';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FileSearchContext } from './file-search-context';
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu';
import { Skeleton } from './ui/skeleton';

export default function FileSearch() {
  const [files, setFiles] = useState<FileInfo[] | []>([]);

  useEffect(() => {
    async function runAsync() {
      const data = await axios.get('/api/file/fetchAll');
      if (data) {
        setFiles((await data).data.data as FileInfo[]);
      }
    }

    runAsync();
  }, []);

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
                    href={`${process.env.NEXTAUTH_URL}/f/${e.id}`}
                  >
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <CommandItem className="">
                          <File className="mr-2 h-4 w-4" />
                          <span className="">{e.name}</span>
                        </CommandItem>
                      </ContextMenuTrigger>
											<FileSearchContext fileInfo={e}/>
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
