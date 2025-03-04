import React from 'react';
import localFont from 'next/font/local';
import ThemeProvider from '@/app/context/Theme';
import Navbar from '@components/navigation/navbar';
import './globals.scss';

export const metadata = {
  title: 'Caantin',
  description: 'A conversational pathway for Caantin AI call flow'
};

const inter = localFont({
  src: './fonts/InterVF.ttf',
  variable: '--font-inter',
  weight: '100 200 300 400 500 600 700 800 900'
});
const spaceGrotesk = localFont({
  src: './fonts/SpaceGroteskVF.ttf',
  variable: '--font-inter',
  weight: '300 400 500 600 700'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link
          rel="icon"
          href="/images/favicon-white.ico"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/images/favicon-blue.ico"
          media="(prefers-color-scheme: light)"
        />
      </head>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
