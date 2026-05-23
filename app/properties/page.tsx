import type { Metadata } from 'next';
import PropertiesPage from '../../src/views/PropertiesPage';

export const metadata: Metadata = {
  title: 'العقارات المتاحة',
  description: 'تصفح أفضل الشقق والفلل المعروضة للبيع بالتقسيط في السعودية مع خيارات متنوعة تناسب احتياجك وميزانيتك.',
  alternates: { canonical: '/properties' },
};

export default function Page() {
  return <PropertiesPage />;
}
