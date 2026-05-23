'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, RotateCcw, X, MessageCircle, ChevronDown } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';
import { type Property } from '../data/properties';
import { getCities, getProperties } from '../lib/content-service';

const ITEMS_PER_PAGE = 6;

const roomOptions = ['الكل', '١', '٢', '٣', '٤', '+٥'];
const statusOptions = ['الكل', 'جديد', 'مستعمل', 'قيد الإنشاء'];
const sortOptions = [
  { value: 'newest', label: 'الأحدث أولًا' },
  { value: 'price_desc', label: 'الأعلى سعرًا' },
  { value: 'price_asc', label: 'الأقل سعرًا' },
];

interface Filters {
  type: string;
  city: string;
  district: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
  rooms: string;
  status: string;
  sort: string;
}

const defaultFilters: Filters = {
  type: 'الكل',
  city: 'الكل',
  district: '',
  minPrice: '',
  maxPrice: '',
  minArea: '',
  maxArea: '',
  rooms: 'الكل',
  status: 'الكل',
  sort: 'newest',
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [settingsCities, setSettingsCities] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let active = true;
    Promise.all([getProperties(), getCities()]).then(([items, cities]) => {
      if (!active) return;
      if (items.length > 0) setProperties(items);
      if (cities.length > 0) setSettingsCities(cities);
    });
    return () => {
      active = false;
    };
  }, []);

  const dynamicTypes = useMemo(
    () => ['الكل', ...Array.from(new Set(properties.map((p) => p.type))).filter(Boolean)],
    [properties]
  );
  const dynamicCities = useMemo(
    () =>
      settingsCities.length > 0
        ? ['الكل', ...settingsCities]
        : ['الكل', ...Array.from(new Set(properties.map((p) => p.city))).filter(Boolean)],
    [properties, settingsCities]
  );

  const filtered = useMemo(() => {
    let result = [...properties];

    if (filters.type !== 'الكل') result = result.filter((p) => p.type === filters.type);
    if (filters.city !== 'الكل') result = result.filter((p) => p.city === filters.city);
    if (filters.district) result = result.filter((p) => p.district.includes(filters.district));
    if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.minArea) result = result.filter((p) => p.area >= Number(filters.minArea));
    if (filters.maxArea) result = result.filter((p) => p.area <= Number(filters.maxArea));
    if (filters.rooms !== 'الكل') {
      const roomMap: Record<string, number> = { '١': 1, '٢': 2, '٣': 3, '٤': 4, '+٥': 5 };
      const roomCount = roomMap[filters.rooms];
      if (roomCount === 5) result = result.filter((p) => p.rooms >= 5);
      else result = result.filter((p) => p.rooms === roomCount);
    }
    if (filters.status !== 'الكل') {
      if (filters.status === 'جديد') result = result.filter((p) => p.isNew);
    }

    if (filters.sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'price_asc') result.sort((a, b) => a.price - b.price);

    setCurrentPage(1); // Reset to page 1 when filters change
    return result;
  }, [filters, properties]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProperties = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const activeFilterCount = [
    filters.type !== 'الكل',
    filters.city !== 'الكل',
    filters.rooms !== 'الكل',
    filters.status !== 'الكل',
    !!filters.district,
    !!filters.minPrice,
    !!filters.maxPrice,
    !!filters.minArea,
    !!filters.maxArea,
  ].filter(Boolean).length;

  const handleReset = () => setFilters(defaultFilters);
  const handleSearch = () => setSearched(true);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="gradient-hero py-16 pattern-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
              <span className="text-gold text-sm font-semibold">🏡 عقارات في أفضل مدن المملكة</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              اكتشف عقارك المثالي في السعودية
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              أكثر من {properties.length} عقار متاح في أبرز مدن المملكة. ابحث حسب المدينة والنوع والسعر والمساحة.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40V20C360 0 720 40 1080 20 1260 10 1380 16 1440 20V40H0z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

          {/* ── Mobile bar ── */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Type quick select */}
            <div className="relative flex-1">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full appearance-none text-sm border border-gray-200 rounded-xl pr-3 pl-7 py-2.5 focus:border-primary outline-none bg-white font-medium text-gray-700"
              >
                {dynamicTypes.map((t) => (
                  <option key={t} value={t}>{t === 'الكل' ? 'نوع العقار' : t}</option>
                ))}
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            {/* Advanced filters button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-gray-50 shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              فلاتر
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Search */}
            <button
              onClick={handleSearch}
              className="btn-primary text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-4 h-4" />
              بحث
            </button>
          </div>

          {/* ── Desktop bar ── */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:border-primary outline-none bg-white shrink-0"
              >
                {dynamicTypes.map((t) => (
                  <option key={t} value={t}>{t === 'الكل' ? 'اختر نوع العقار' : t}</option>
                ))}
              </select>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:border-primary outline-none bg-white shrink-0"
              >
                {dynamicCities.map((c) => (
                  <option key={c} value={c}>{c === 'الكل' ? 'اختر المدينة' : c}</option>
                ))}
              </select>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:border-primary outline-none bg-white shrink-0"
              >
                {sortOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-colors shrink-0 ${
                showFilters ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              فلاتر متقدمة
              {activeFilterCount > 0 && (
                <span className="bg-white/30 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button
              onClick={handleSearch}
              className="btn-primary text-sm font-bold px-5 py-2 rounded-xl flex items-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              ابحث الآن
            </button>
          </div>

          {/* Desktop advanced filters panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden hidden sm:block"
              >
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 border-t border-gray-100 mt-4">
                  <input
                    type="text"
                    placeholder="اكتب اسم الحي — اختياري"
                    value={filters.district}
                    onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:border-primary outline-none col-span-2 sm:col-span-1"
                  />
                  <input
                    type="number"
                    placeholder="من: 0 ريال"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:border-primary outline-none"
                  />
                  <input
                    type="number"
                    placeholder="إلى: غير محدد"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:border-primary outline-none"
                  />
                  <select
                    value={filters.rooms}
                    onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:border-primary outline-none bg-white"
                  >
                    {roomOptions.map((r) => (
                      <option key={r} value={r}>{r === 'الكل' ? 'عدد الغرف' : r + ' غرف'}</option>
                    ))}
                  </select>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:border-primary outline-none bg-white"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s === 'الكل' ? 'الحالة' : s}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-xl border border-gray-200 hover:border-red-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    إعادة تعيين
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Mobile Filters Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-50 sm:hidden"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl sm:hidden max-h-[88vh] flex flex-col"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <h2 className="text-base font-bold text-primary-dark">الفلاتر</h2>
                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={handleReset}
                      className="text-sm text-red-500 font-semibold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      مسح الكل
                    </button>
                  )}
                  <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-xl bg-gray-100">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">

                {/* City */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">المدينة</p>
                  <div className="relative">
                    <select
                      value={filters.city}
                      onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                      className="w-full appearance-none text-sm border border-gray-200 rounded-xl pr-4 pl-8 py-3 focus:border-primary outline-none bg-gray-50 font-medium text-gray-700"
                    >
                      {dynamicCities.map((c) => (
                        <option key={c} value={c}>{c === 'الكل' ? 'كل المدن' : c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Rooms */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">عدد الغرف</p>
                  <div className="flex gap-2 flex-wrap">
                    {roomOptions.map((r) => (
                      <button
                        key={r}
                        onClick={() => setFilters({ ...filters, rooms: r })}
                        className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${
                          filters.rooms === r
                            ? 'bg-primary text-white border-primary'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        {r === 'الكل' ? 'الكل' : r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">حالة العقار</p>
                  <div className="flex gap-2 flex-wrap">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilters({ ...filters, status: s })}
                        className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${
                          filters.status === s
                            ? 'bg-primary text-white border-primary'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">نطاق السعر (ريال)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="الحد الأدنى"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="text-sm border border-gray-200 rounded-xl px-3 py-3 focus:border-primary outline-none bg-gray-50"
                    />
                    <input
                      type="number"
                      placeholder="الحد الأقصى"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="text-sm border border-gray-200 rounded-xl px-3 py-3 focus:border-primary outline-none bg-gray-50"
                    />
                  </div>
                </div>

                {/* District */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الحي</p>
                  <input
                    type="text"
                    placeholder="اكتب اسم الحي"
                    value={filters.district}
                    onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-3 focus:border-primary outline-none bg-gray-50"
                  />
                </div>

                {/* Sort */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الترتيب</p>
                  <div className="flex gap-2 flex-wrap">
                    {sortOptions.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setFilters({ ...filters, sort: s.value })}
                        className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${
                          filters.sort === s.value
                            ? 'bg-primary text-white border-primary'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply button */}
              <div className="px-5 py-4 border-t border-gray-100">
                <button
                  onClick={() => { handleSearch(); setDrawerOpen(false); }}
                  className="w-full btn-primary py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  عرض النتائج
                  {filtered.length > 0 && (
                    <span className="bg-white/20 text-white text-sm font-bold px-2 py-0.5 rounded-lg">
                      {filtered.length}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Results */}
      <section className="py-10 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600 text-sm">
              عرض <span className="font-bold text-primary">{filtered.length}</span> من أصل <span className="font-bold">{properties.length}</span> عقار
            </p>
            {/* Active filter chips */}
            <div className="flex flex-wrap gap-2">
              {filters.type !== 'الكل' && (
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  {filters.type}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, type: 'الكل' })} />
                </span>
              )}
              {filters.city !== 'الكل' && (
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  {filters.city}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, city: 'الكل' })} />
                </span>
              )}
            </div>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProperties.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 opacity-30">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-primary-dark mb-3">لا توجد عقارات تطابق بحثك</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                لا توجد عقارات تطابق بحثك حاليًا. جرّب تعديل الفلاتر أو تواصل معنا مباشرة وسنساعدك في إيجاد ما تبحث عنه.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="btn-primary px-6 py-3 rounded-xl font-bold text-sm"
                >
                  إعادة تعيين الفلاتر
                </button>
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  تواصل مع فريق لقمان الآن
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
