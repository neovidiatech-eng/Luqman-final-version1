import type { Metadata } from 'next';
import BlogArticle1Page from '../../../src/views/BlogArticle1Page';

export const metadata: Metadata = {
  title: 'كيفية شراء عقار في السعودية خطوة بخطوة',
  description: 'دليل شامل لخطوات شراء عقار في السعودية من تحديد الميزانية وحتى إنهاء الإجراءات القانونية.',
  alternates: { canonical: '/blog/how-to-buy-property-in-saudi-arabia' },
};

export default function Page() {
  return <BlogArticle1Page />;
}
