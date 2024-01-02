import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ModalProvider } from '@/providers/modal-provider';

const font = Inter({
  // weight: ['100', '300', '400', '500', '700', '900'],
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

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
