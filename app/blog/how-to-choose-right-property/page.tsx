import type { Metadata } from 'next';
import BlogArticle3Page from '../../../src/views/BlogArticle3Page';

export const metadata: Metadata = {
  title: 'كيف تختار العقار المناسب لاحتياجك؟',
  description: 'تعلم المعايير الأساسية لاختيار العقار المناسب من حيث الموقع والسعر والمساحة.',
  alternates: { canonical: '/blog/how-to-choose-right-property' },
};

export default function Page() {
  return <BlogArticle3Page />;
}
