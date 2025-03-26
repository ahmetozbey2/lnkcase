import './globals.css';

import type { Metadata } from 'next';
import { Syne } from 'next/font/google';

import { HambuergerMenu } from '@/ui/layout/hamburgerMenu';
import Sidebar from '@/ui/layout/sidebar';
import { ThemeProvider } from '@/ui/layout/themeProvider';
import { ModeToggle } from '@/ui/layout/themeSwitcher';

const geistMono = Syne({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'G-LNK',
  description: 'AI-Powered Fair Market Valuations for Healthcare Compliance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${geistMono.className} flex items-start antialiased dark:bg-[#0d0d0d] max-lg:flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <div className="mx-auto flex w-[92%] justify-between pt-8 lg:hidden ">
            <h3 className="text-3xl font-bold">G-LNK</h3>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <HambuergerMenu />
            </div>
          </div>

          <div className="flex w-full flex-col lg:ml-[20%] lg:w-4/5">
            <div className="absolute right-4 top-4 max-lg:hidden">
              <ModeToggle />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
