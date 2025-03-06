import React from 'react';
import NavLinks from '../NavLinks';

const LeftSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 m-6 flex h-[90vh] flex-col justify-between overflow-y-auto rounded-3xl border-r p-6 pt-16 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[220px]">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>
    </section>
  );
};

export default LeftSidebar;
