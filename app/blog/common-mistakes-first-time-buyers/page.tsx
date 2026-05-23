import type { Metadata } from 'next';
import BlogArticle2Page from '../../../src/views/BlogArticle2Page';

export const metadata: Metadata = {
  title: 'أخطاء شائعة يقع فيها مشتري العقار لأول مرة',
  description: 'تعرف على الأخطاء الشائعة في شراء العقار لأول مرة وكيف تتجنبها.',
  alternates: { canonical: '/blog/common-mistakes-first-time-buyers' },
};

export default function Page() {
  return <BlogArticle2Page />;
}
