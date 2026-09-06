import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jeffrey JJ Jewell | IT Professional',
  description:
    'Professional portfolio of Jeffrey JJ Jewell - IT Professional specializing in networking, systems administration, cloud, and DevOps.',
  keywords: ['IT', 'sysadmin', 'networking', 'Docker', 'Linux', 'Windows Server', 'homelab'],
  openGraph: {
    title: 'Jeffrey JJ Jewell | IT Professional',
    description:
      'Professional portfolio of Jeffrey JJ Jewell - IT Professional specializing in networking, systems administration, cloud, and DevOps.',
    url: 'https://jjsworld.jewellcore.com',
    siteName: 'JJ Jewell',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
