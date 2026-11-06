import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Shell from './shell';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quill admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Shell publicKey={process.env.QUILL_PUBLIC_KEY ?? ''}>{children}</Shell>
      </body>
    </html>
  );
}
