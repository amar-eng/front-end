import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';

const font = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'instaclean',
  description: 'A brandstudios.ca project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
