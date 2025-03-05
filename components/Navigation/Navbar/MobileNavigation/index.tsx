'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import NavLinks from '../NavLinks';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

const MobileNavigation = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={
            resolvedTheme === 'dark'
              ? '/icons/hamburger-white.svg'
              : '/icons/hamburger-blue.svg'
          }
          alt="menu"
          width={36}
          height={36}
          className="cursor-pointer sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        className="background-light900_dark200 border-none"
        side="left"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image
            src={
              resolvedTheme === 'dark'
                ? '/images/logo-white.svg'
                : '/images/logo-blue.svg'
            }
            alt="menu"
            width={80}
            height={23}
            className="cursor-pointer sm:hidden"
          />
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
