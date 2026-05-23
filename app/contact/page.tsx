import type { Metadata } from 'next';
import ContactPage from '../../src/views/ContactPage';

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'تواصل مع فريق لقمان للحصول على استشارة عقارية مجانية.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <ContactPage />;
}
