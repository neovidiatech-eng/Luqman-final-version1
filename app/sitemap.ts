import type { MetadataRoute } from 'next';
import { getProjects, getProperties } from '../src/lib/content-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const now = new Date();
  const [properties, projects] = await Promise.all([getProperties(), getProjects()]);

  const staticRoutes = [
    '', '/properties', '/projects', '/about', '/blog', '/contact',
    '/blog/how-to-buy-property-in-saudi-arabia',
    '/blog/common-mistakes-first-time-buyers',
    '/blog/how-to-choose-right-property',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const propertyRoutes = properties.map((property) => ({
    url: `${siteUrl}/properties/${property.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes, ...projectRoutes];
}
