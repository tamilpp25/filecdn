import NextAuthProvider from '@/components/nextauthprovider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FileCDN',
  description: 'Host and share files easily!',
  icons: {
    icon: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <Navbar />
            {children}
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
