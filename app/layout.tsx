import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AuraLMS - Nền Tảng Học Lập Trình Cá Nhân Hóa Thích Ứng (Adaptive LMS)',
    template: '%s | AuraLMS',
  },
  description:
    'AuraLMS giải quyết sự phân hóa học lực trong lớp học bằng công nghệ Adaptive UI, SVG Roadmap rẽ nhánh linh hoạt, AI Companion đa tính cách và Interactive Rubrics.',
  keywords: [
    'AuraLMS',
    'Adaptive LMS',
    'Học lập trình',
    'Cá nhân hóa học tập',
    'AI Companion',
    'Interactive Rubrics',
    'Next.js LMS',
    'Supabase Database',
  ],
  authors: [{ name: 'AuraLMS Team' }],
  creator: 'AuraLMS',
  metadataBase: new URL('https://auralms.vercel.app'),
  openGraph: {
    title: 'AuraLMS - Nền Tảng Học Lập Trình Cá Nhân Hóa Thích Ứng',
    description: 'Hệ thống tự động thay đổi lộ trình, giao diện và AI Companion phù hợp riêng cho từng học viên.',
    url: 'https://auralms.vercel.app',
    siteName: 'AuraLMS',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraLMS - Adaptive LMS Platform',
    description: 'Tối ưu hóa học lập trình với Adaptive UI & AI Assistant.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'AuraLMS',
    url: 'https://auralms.vercel.app',
    description: 'Nền tảng quản lý học tập cá nhân hóa thích ứng dành cho học sinh học lập trình.',
    sameAs: ['https://github.com/auralms'],
  };

  return (
    <html lang="vi" className={inter.variable} data-tier="struggling">
      <head>
        <JsonLd data={orgJsonLd} />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <AppProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
