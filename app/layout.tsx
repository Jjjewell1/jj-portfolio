import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jeffrey "JJ" Jewell | The Grid',
  description:
    'IT & Cybersecurity student building self-hosted infrastructure, agentic AI workflows, and full-stack tools. Homelab-native, Docker-first, security-minded.',
  keywords: [
    'IT',
    'cybersecurity',
    'homelab',
    'Docker',
    'Coolify',
    'Unraid',
    'Next.js',
    'Three.js',
    'self-hosted',
    'AI automation',
  ],
  openGraph: {
    title: 'Jeffrey "JJ" Jewell | The Grid',
    description:
      'IT & Cybersecurity student building self-hosted infrastructure, agentic AI workflows, and full-stack tools.',
    url: 'https://jj.jewellcore.com',
    siteName: 'JJ Jewell — The Grid',
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
