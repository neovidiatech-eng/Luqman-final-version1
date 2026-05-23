import type { BlogPost, Project, Property } from '../data/properties';

const propertyTypeMap: Record<string, string> = {
  apartment: 'شقق سكنية',
  villa: 'فلل',
  land: 'أراضي',
  commercial: 'عقارات تجارية',
  compound: 'مجمعات سكنية',
  offplan: 'مشاريع قيد الإنشاء',
  resort: 'وحدات سياحية',
  building: 'عمارات',
};

const propertyStatusMap: Record<string, Property['status']> = {
  available: 'متاح',
  reserved: 'محجوز',
  sold: 'مباع',
};

const projectStatusMap: Record<string, Project['deliveryStatus']> = {
  under_construction: 'قيد الإنشاء',
  completed: 'مكتمل',
  under_development: 'قيد التطوير',
};

const projectTypeMap: Record<string, Project['type']> = {
  compound: 'مجمع سكني',
  commercial: 'تجاري',
  offplan: 'مشروع على الخارطة',
  resort: 'سياحي',
};

function asNumber(value: unknown, fallback = 0): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function toSlug(value: string): string {
  return value
    .trim()
    .normalize('NFC')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function toId(raw: Record<string, unknown>): string {
  return asString(raw.id || raw._id || raw.uuid || crypto.randomUUID());
}

function normalizeFiles(rawFiles: unknown): Array<{ url: string; name: string; size?: number; type?: string }> {
  if (!Array.isArray(rawFiles)) return [];

  return rawFiles
    .map((file) => {
      if (!file || typeof file !== 'object') return null;
      const f = file as Record<string, unknown>;
      const url = asString(f.url || f.fileUrl || f.link);
      if (!url) return null;

      return {
        url,
        name: asString(f.name || f.fileName || f.title || 'تحميل الملف'),
        size: Number.isFinite(Number(f.size)) ? Number(f.size) : undefined,
        type: asString(f.type || f.mimeType),
      };
    })
    .filter(Boolean) as Array<{ url: string; name: string; size?: number; type?: string }>;
}

function resolveSlug(raw: Record<string, unknown>, fallbackId: string): string {
  const directSlug = asString(raw.slug || raw.seoSlug || raw.permalink);
  if (directSlug) return toSlug(directSlug);

  const titleSlug = asString(raw.title || raw.name);
  if (titleSlug) return toSlug(titleSlug);

  return toSlug(fallbackId);
}

export function adaptProperty(rawItem: unknown): Property | null {
  if (!rawItem || typeof rawItem !== 'object') return null;
  const raw = rawItem as Record<string, unknown>;
  const id = toId(raw);
  const slug = resolveSlug(raw, id);

  const typeKey = asString(raw.type);
  const statusKey = asString(raw.status);

  return {
    id,
    slug,
    title: asString(raw.title || raw.name),
    type: propertyTypeMap[typeKey] || asString(raw.typeLabel || raw.typeName || raw.type || 'شقق سكنية'),
    city: asString(raw.city || raw.locationCity),
    district: asString(raw.district || raw.locationDistrict),
    price: asNumber(raw.price),
    area: asNumber(raw.area),
    rooms: asNumber(raw.rooms ?? raw.bedrooms),
    bathrooms: asNumber(raw.bathrooms),
    floor: raw.floor !== undefined ? asNumber(raw.floor) : undefined,
    status: propertyStatusMap[statusKey] || 'متاح',
    isNew: Boolean(raw.isNew),
    financeAvailable: Boolean(raw.financeAvailable || raw.financingAvailable),
    features: Array.isArray(raw.features) ? raw.features.map((f) => asString(f)).filter(Boolean) : [],
    images: Array.isArray(raw.images) ? raw.images.map((i) => asString(i)).filter(Boolean) : [],
    files: normalizeFiles(raw.files),
    description: asString(raw.description),
    addedDate: asString(raw.addedDate || raw.createdAt),
  };
}

export function adaptProject(rawItem: unknown): Project | null {
  if (!rawItem || typeof rawItem !== 'object') return null;
  const raw = rawItem as Record<string, unknown>;
  const id = toId(raw);
  const slug = resolveSlug(raw, id);

  const statusKey = asString(raw.deliveryStatus || raw.status);
  const typeKey = asString(raw.type);

  const availableUnits = Array.isArray(raw.availableUnits)
    ? raw.availableUnits
        .map((u) => {
          if (!u || typeof u !== 'object') return null;
          const unit = u as Record<string, unknown>;
          return {
            type: asString(unit.type),
            area: asNumber(unit.area),
            price: asNumber(unit.price),
            floor: asString(unit.floor),
            status: propertyStatusMap[asString(unit.status)] || 'متاح',
          };
        })
        .filter(Boolean)
    : [];

  return {
    id,
    slug,
    title: asString(raw.title || raw.name),
    location: asString(raw.location || raw.district),
    city: asString(raw.city),
    units: asNumber(raw.units || raw.unitsCount),
    deliveryStatus: projectStatusMap[statusKey] || 'قيد الإنشاء',
    type: projectTypeMap[typeKey] || 'مجمع سكني',
    startingPrice: asNumber(raw.startingPrice || raw.priceFrom),
    description: asString(raw.description),
    features: Array.isArray(raw.features) ? raw.features.map((f) => asString(f)).filter(Boolean) : [],
    paymentPlan: asString(raw.paymentPlan),
    developer: asString(raw.developer || raw.developerName),
    images: Array.isArray(raw.images) ? raw.images.map((i) => asString(i)).filter(Boolean) : [],
    files: normalizeFiles(raw.files),
    availableUnits: availableUnits as Project['availableUnits'],
  };
}

export function adaptBlogPost(rawItem: unknown): BlogPost | null {
  if (!rawItem || typeof rawItem !== 'object') return null;
  const raw = rawItem as Record<string, unknown>;
  const id = toId(raw);
  const slug = resolveSlug(raw, id);

  return {
    id,
    slug,
    title: asString(raw.title),
    excerpt: asString(raw.excerpt || raw.summary || raw.description),
    category: asString(raw.category || raw.categoryName || 'عام'),
    date: asString(raw.date || raw.publishedAt || raw.createdAt),
    readTime: asString(raw.readTime || '5 دقائق'),
    image: asString(raw.image || raw.coverImage || raw.thumbnail),
  };
}
