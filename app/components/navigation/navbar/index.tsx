import React from 'react';
import Account from './account';
import Logo from './logo';
import Theme from './theme';

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 z-50 h-[40px] w-full gap-6 shadow-light-300 dark:shadow-none sm:px-4 sm:py-6">
      <Logo />
      <div className="flex items-center gap-3">
        <Theme />
        <Account />
      </div>
    </nav>
  );
};

export default Navbar;
