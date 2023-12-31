'use client';

import * as React from 'react';
import { Cloud, Github, LifeBuoy, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { signOut, useSession } from 'next-auth/react';
import { Badge } from './ui/badge';

export function ProfileDropdown() {
  const { data: session, status } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            className="w-10 h-10 rounded-full"
            src={session?.user?.image!}
          />
          <AvatarFallback>FC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-row items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <Badge variant="default" className="ml-auto text-bold text-white dark:text-black">
              ADMIN
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a
            href="https://github.com/tamilpp25/filecdn"
            target="_blank"
            className="flex flex-row items-center"
          >
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            href="mailto:info@tamil.moe"
            target="_blank"
            className="flex flex-row items-center"
          >
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
