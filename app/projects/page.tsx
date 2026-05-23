import type { Metadata } from 'next';
import ProjectsPage from '../../src/views/ProjectsPage';

export const metadata: Metadata = {
  title: 'مشاريعنا العقارية',
  description: 'اكتشف المشاريع العقارية المتاحة بخطط سداد مرنة وخيارات متعددة.',
  alternates: { canonical: '/projects' },
};

export default function Page() {
  return <ProjectsPage />;
}
