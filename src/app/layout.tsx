import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ChatBot from '@/components/ChatBot';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TheNetrider - AI Assistant',
  description:
    'Get instant answers about digital marketing, AI courses, and web development services from TheNetrider',
  keywords:
    'digital marketing, AI training, web development, freelancing, e-commerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased bg-futuristic-background`} suppressHydrationWarning>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
