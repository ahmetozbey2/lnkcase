import './globals.css';

import type { Metadata } from 'next';
import { Syne } from 'next/font/google';

import { SheetDemo } from '@/ui/layout/hamburgerMenu';
import Sidebar from '@/ui/layout/sidebar';

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
    <html lang="en">
      <body
        className={` ${geistMono.className} flex items-start antialiased max-lg:flex-col`}
      >
        <Sidebar />
        <div className="mx-auto flex w-[92%] justify-between pt-8 lg:hidden">
          <h3 className="text-3xl font-bold">G-LNK</h3>
          <SheetDemo />
        </div>
        <div className="lg:ml-[20%] lg:w-4/5">{children}</div>
      </body>
    </html>
  );
}
