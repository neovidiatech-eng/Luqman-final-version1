import {
  blogPosts as fallbackBlogPosts,
  sampleProjects as fallbackProjects,
  sampleProperties as fallbackProperties,
  type BlogPost,
  type Project,
  type Property,
} from '../data/properties';
import { adaptBlogPost, adaptProject, adaptProperty } from './content-adapters';

type ContentResponse<T> = {
  data?: T[];
  items?: T[];
  results?: T[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');
const USE_FALLBACK_DATA = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';
const PROPERTIES_ENDPOINT = process.env.NEXT_PUBLIC_PROPERTIES_ENDPOINT || '/properties';
const PROJECTS_ENDPOINT = process.env.NEXT_PUBLIC_PROJECTS_ENDPOINT || '/projects';
const BLOG_ENDPOINT = process.env.NEXT_PUBLIC_BLOG_ENDPOINT || '/blog-posts';
const SETTINGS_CITIES_ENDPOINT = process.env.NEXT_PUBLIC_SETTINGS_CITIES_ENDPOINT || '/settings/cities';
const SETTINGS_FEATURES_ENDPOINT = process.env.NEXT_PUBLIC_SETTINGS_FEATURES_ENDPOINT || '/settings/features';

function normalizeSlug(value: string): string {
  return decodeURIComponent(String(value)).trim().normalize('NFC');
}

function pickArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object') {
    const wrapped = payload as ContentResponse<T>;
    if (Array.isArray(wrapped.data)) return wrapped.data;
    if (Array.isArray(wrapped.items)) return wrapped.items;
    if (Array.isArray(wrapped.results)) return wrapped.results;

    const dataObj = (wrapped as { data?: unknown }).data;
    if (dataObj && typeof dataObj === 'object') {
      for (const value of Object.values(dataObj as Record<string, unknown>)) {
        if (Array.isArray(value)) return value as T[];
      }
    }
  }
  return [];
}

async function fetchCollection<T>(endpoint: string): Promise<T[] | null> {
  if (!API_BASE_URL) return null;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as unknown;
    const data = pickArray<T>(payload);
    return data.length ? data : [];
  } catch {
    return null;
  }
}

export async function getProperties(): Promise<Property[]> {
  const remote = await fetchCollection<Property>(PROPERTIES_ENDPOINT);
  if (remote && remote.length > 0) {
    const adapted = remote.map((item) => adaptProperty(item)).filter(Boolean) as Property[];
    if (adapted.length > 0) return adapted;
  }
  return USE_FALLBACK_DATA ? fallbackProperties : [];
}

export async function getProjects(): Promise<Project[]> {
  const remote = await fetchCollection<Project>(PROJECTS_ENDPOINT);
  if (remote && remote.length > 0) {
    const adapted = remote.map((item) => adaptProject(item)).filter(Boolean) as Project[];
    if (adapted.length > 0) return adapted;
  }
  return USE_FALLBACK_DATA ? fallbackProjects : [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const remote = await fetchCollection<BlogPost>(BLOG_ENDPOINT);
  if (remote && remote.length > 0) {
    const adapted = remote.map((item) => adaptBlogPost(item)).filter(Boolean) as BlogPost[];
    if (adapted.length > 0) return adapted;
  }
  return USE_FALLBACK_DATA ? fallbackBlogPosts : [];
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const normalized = normalizeSlug(slug);
  const items = await getProperties();
  return (
    items.find((item) => normalizeSlug(item.slug) === normalized) ??
    items.find((item) => normalizeSlug(item.id) === normalized) ??
    null
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const normalized = normalizeSlug(slug);
  const items = await getProjects();
  return (
    items.find((item) => normalizeSlug(item.slug) === normalized) ??
    items.find((item) => normalizeSlug(item.id) === normalized) ??
    null
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const normalized = normalizeSlug(slug);
  const items = await getBlogPosts();
  return items.find((item) => normalizeSlug(item.slug) === normalized) ?? null;
}

export async function getCities(): Promise<string[]> {
  const remote = await fetchCollection<string>(SETTINGS_CITIES_ENDPOINT);
  if (remote && remote.length > 0) return remote.map((c) => String(c).trim()).filter(Boolean);

  if (USE_FALLBACK_DATA) {
    return Array.from(new Set(fallbackProperties.map((p) => p.city))).filter(Boolean);
  }
  return [];
}

export async function getFeatures(): Promise<string[]> {
  const remote = await fetchCollection<string>(SETTINGS_FEATURES_ENDPOINT);
  if (remote && remote.length > 0) return remote.map((f) => String(f).trim()).filter(Boolean);

  if (USE_FALLBACK_DATA) {
    return Array.from(
      new Set(fallbackProperties.flatMap((p) => p.features).map((f) => String(f).trim()).filter(Boolean))
    );
  }
  return [];
}
