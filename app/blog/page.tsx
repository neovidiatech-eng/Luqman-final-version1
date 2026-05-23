import type { Metadata } from 'next';
import BlogPage from '../../src/views/BlogPage';

export const metadata: Metadata = {
  title: 'مدونة لقمان العقارية',
  description: 'مقالات ونصائح عملية حول شراء العقار والاستثمار العقاري في السعودية.',
  alternates: { canonical: '/blog' },
};

export default function Page() {
  return <BlogPage />;
}
