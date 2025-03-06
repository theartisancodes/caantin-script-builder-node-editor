'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();
  const userId = 1;

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === '/profile') {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? 'primary-gradient rounded-lg text-light-900'
                : 'text-dark300_light900 hover:rounded-lg hover:bg-light-200 dark:hover:bg-primary-200',
              'flex items-center justify-start gap-2 bg-transparent p-2'
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={16}
              height={16}
              className={cn({ 'invert-colors': !isActive })}
            />
            <p
              className={cn(
                isActive ? 'base-bold-small' : 'base-small',
                !isMobileNav && 'max-lg:hidden'
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
