'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useSession } from 'next-auth/react';
import { ModeToggle } from './theme_toggle';
import Image from 'next/image';
import { ProfileDropdown } from './profile-dropdown';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <div className="flex flex-row items-center justify-between bg-white dark:bg-black">
      <div className="flex flex-row gap-3 items-center">
        <Link href="/" className='flex flex-row items-center'>
          <Image
            className="m-3"
            height={40}
            width={40}
            src="/assets/logo.png"
            alt="logo"
          />
          <a className='font-bold'>FileCDN</a>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-2">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/upload" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Upload
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-row gap-3 ">
        <div className="mx-3 flex flex-row gap-3">
          <ModeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
