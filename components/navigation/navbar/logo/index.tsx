'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Link
      href="/public"
      className="flex cursor-pointer items-center gap-1 max-sm:hidden"
    >
      <Image
        src={
          resolvedTheme === 'dark'
            ? '/images/logo-white.svg'
            : '/images/logo-blue.svg'
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
