// app/(root)/layout.tsx
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
              ? 'mr-4 h-[100vh]'
              : 'px-6 pb-6 pt-3 max-md:pb-14 sm:px-14'
          }`}
        >
          {isWorkflowPage ? (
            children
          ) : (
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          )}
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
