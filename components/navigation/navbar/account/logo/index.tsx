'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Link
      href="/"
      className="flex cursor-pointer items-center gap-1 max-sm:hidden"
    >
      <Image
        src={
          resolvedTheme === 'dark'
            ? '/images/logo-dark.svg'
            : '/images/logo-light.svg'
        }
        alt="Logo"
        width={152}
        height={30}
        priority
      />
    </Link>
  );
};

export default Logo;
