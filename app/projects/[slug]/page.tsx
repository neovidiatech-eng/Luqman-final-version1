import type { Metadata } from 'next';
import ProjectDetailPage from '../../../src/views/ProjectDetailPage';
import { getProjectBySlug } from '../../../src/lib/content-service';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: 'المشروع غير موجود' };

  return {
    title: `${project.title} في ${project.city}`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return <ProjectDetailPage slug={slug} initialProject={project} />;
}
