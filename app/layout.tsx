import type { Metadata } from 'next';
import '../src/index.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import FloatingWhatsApp from '../src/components/FloatingWhatsApp';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: {
    default: 'لقمان للعقارات | وسيط مرخص لشراء العقارات بالتقسيط في السعودية',
    template: '%s | لقمان للعقارات',
  },
  description:
    'لقمان وسيط عقاري مرخص من هيئة العقار السعودية بخبرة أكثر من 15 عامًا. امتلك شقتك أو فيلتك بالتقسيط بدون مقدم وأول قسط بعد 5 سنوات.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    title: 'لقمان للعقارات',
    description: 'وسيط عقاري مرخص في السعودية لشراء العقارات بالتقسيط.',
    siteName: 'لقمان للعقارات',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'لقمان للعقارات',
    description: 'وسيط عقاري مرخص في السعودية لشراء العقارات بالتقسيط.',
    images: ['/logo.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body dir="rtl" className="font-cairo">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
