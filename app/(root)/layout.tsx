'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../../components/Navigation/Navbar';
import LeftSidebar from '../../components/Navigation/Navbar/LeftSidebar';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isWorkflowPage = pathname === '/workflows';

  return (
    <main className="background-light800_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section
          className={`flex min-h-screen flex-1 flex-col ${
            isWorkflowPage
              ? 'h-[calc(100vh-64px)]' // Adjust this value based on your navbar height
              : 'px-6 pb-6 pt-3 max-md:pb-14 sm:px-14'
          }`}
        >
          {isWorkflowPage ? (
            <div className="h-full w-full">{children}</div>
          ) : (
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          )}
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
