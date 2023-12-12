import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import { ModalProvider } from '@/providers/modal-provider';

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
      <body className={font.className}>
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}
