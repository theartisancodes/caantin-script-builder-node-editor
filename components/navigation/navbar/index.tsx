import React from 'react';
import Account from './account';
import Logo from './logo';
import Theme from './theme';
import MobileNavigation from '@/components/navigation/navbar/mobile-navigation';

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 z-50 flex h-[40px] w-full items-center justify-between px-4 shadow-light-300 dark:shadow-none sm:px-6">
      <div className="block sm:hidden">
        <MobileNavigation />
      </div>
      <Logo />
      <div className="flex-end w-full gap-3">
        <Theme />
        <Account />
      </div>
    </nav>
  );
};

export default Navbar;
