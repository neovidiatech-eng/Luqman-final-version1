import type { Metadata } from 'next';
import PropertyDetailPage from '../../../src/views/PropertyDetailPage';
import { getPropertyBySlug } from '../../../src/lib/content-service';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) return { title: 'العقار غير موجود' };

  return {
    title: `${property.title} في ${property.city}`,
    description: property.description,
    alternates: { canonical: `/properties/${property.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  return <PropertyDetailPage slug={slug} initialProperty={property} />;
}
