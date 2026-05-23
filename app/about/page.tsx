import type { Metadata } from 'next';
import AboutPage from '../../src/views/AboutPage';

export const metadata: Metadata = {
  title: 'من نحن',
  description: 'تعرف على لقمان للعقارات وخبرتنا في الوساطة العقارية داخل السوق السعودي.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return <AboutPage />;
}
