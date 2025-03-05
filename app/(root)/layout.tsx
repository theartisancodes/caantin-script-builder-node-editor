import { ReactNode } from 'react';
import Navbar from '../../components/Navigation/Navbar';
import LeftSidebar from '../../components/Navigation/Navbar/LeftSidebar';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light800_dark100 realtive">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-3 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
