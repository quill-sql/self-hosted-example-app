import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Providers from './providers';
import Shell from './shell';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quill admin',
  description: 'Self-hosted Quill admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Providers publicKey={process.env.QUILL_PUBLIC_KEY ?? ''}>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
