'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import Pagination from '../components/Pagination';
import { type Project } from '../data/properties';
import { getCities, getProjects } from '../lib/content-service';

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [settingsCities, setSettingsCities] = useState<string[]>([]);
  const [city, setCity] = useState('كل المدن');
  const [status, setStatus] = useState('الكل');
  const [type, setType] = useState('الكل');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let active = true;
    Promise.all([getProjects(), getCities()]).then(([items, cities]) => {
      if (!active) return;
      if (items.length > 0) setProjects(items);
      if (cities.length > 0) setSettingsCities(cities);
    });
    return () => {
      active = false;
    };
  }, []);

  const dynamicCities = useMemo(
    () =>
      settingsCities.length > 0
        ? ['كل المدن', ...settingsCities]
        : ['كل المدن', ...Array.from(new Set(projects.map((p) => p.city))).filter(Boolean)],
    [projects, settingsCities]
  );
  const dynamicStatuses = useMemo(
    () => ['الكل', ...Array.from(new Set(projects.map((p) => p.deliveryStatus))).filter(Boolean)],
    [projects]
  );
  const dynamicTypes = useMemo(
    () => ['الكل', ...Array.from(new Set(projects.map((p) => p.type))).filter(Boolean)],
    [projects]
  );

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const activeCount = [city !== 'كل المدن', status !== 'الكل', type !== 'الكل'].filter(Boolean).length;
  const handleReset = () => { setCity('كل المدن'); setStatus('الكل'); setType('الكل'); };

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return projects.filter((p) => {
      if (city !== 'كل المدن' && !p.city.includes(city)) return false;
      if (status !== 'الكل' && p.deliveryStatus !== status) return false;
      if (type !== 'الكل' && p.type !== type) return false;
      return true;
    });
  }, [city, status, type, projects]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProjects = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="gradient-hero py-20 pattern-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5">
              <span className="text-gold text-sm font-semibold">شراكات حصرية مع كبار المطورين</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              أبرز المشاريع العقارية في المملكة
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              من خلال شراكاتنا المباشرة مع كبار المطورين العقاريين المعتمدين في السعودية، نوفر لك وصولًا حصريًا لمشاريع ذات نمو حقيقي وعوائد مجدية.
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
            <div className="relative flex-1">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none text-sm border border-gray-200 rounded-xl pr-3 pl-7 py-2.5 focus:border-primary outline-none bg-white font-medium text-gray-700"
              >
                {dynamicCities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-gray-50 shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              فلاتر
              {activeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {/* ── Desktop bar ── */}
          <div className="hidden sm:flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-500 self-center">المدينة:</span>
              {dynamicCities.map((c) => (
                <button key={c} onClick={() => setCity(c)}
                  className={`text-sm font-semibold px-3 py-1.5 rounded-xl transition-all ${city === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-500 self-center">الحالة:</span>
              {dynamicStatuses.map((s) => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`text-sm font-semibold px-3 py-1.5 rounded-xl transition-all ${status === s ? 'bg-gold text-white' : 'bg-gray-100 text-gray-600 hover:bg-gold/10 hover:text-gold-dark'}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-500 self-center">النوع:</span>
              {dynamicTypes.map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`text-sm font-semibold px-3 py-1.5 rounded-xl transition-all ${type === t ? 'bg-primary-light text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-50 sm:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl sm:hidden max-h-[80vh] flex flex-col"
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <h2 className="text-base font-bold text-primary-dark">الفلاتر</h2>
                <div className="flex items-center gap-3">
                  {activeCount > 0 && (
                    <button onClick={handleReset} className="text-sm text-red-500 font-semibold flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5" />
                      مسح الكل
                    </button>
                  )}
                  <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-xl bg-gray-100">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 px-5 py-4 space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">المدينة</p>
                  <div className="flex flex-wrap gap-2">
                    {dynamicCities.map((c) => (
                      <button key={c} onClick={() => setCity(c)}
                        className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${city === c ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">حالة المشروع</p>
                  <div className="flex flex-wrap gap-2">
                    {dynamicStatuses.map((s) => (
                      <button key={s} onClick={() => setStatus(s)}
                        className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${status === s ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">نوع المشروع</p>
                  <div className="flex flex-wrap gap-2">
                    {dynamicTypes.map((t) => (
                      <button key={t} onClick={() => setType(t)}
                        className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${type === t ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-gray-100">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-full btn-primary py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
                >
                  عرض النتائج
                  <span className="bg-white/20 text-white text-sm font-bold px-2 py-0.5 rounded-lg">
                    {filtered.length}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Projects grid */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mb-8">
            عرض <span className="font-bold text-primary">{filtered.length}</span> مشروع
          </p>

          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-bold text-primary-dark mb-4">لا توجد مشاريع تطابق الفلاتر</p>
              <button
                onClick={() => { setCity('كل المدن'); setStatus('الكل'); setType('الكل'); }}
                className="btn-primary px-6 py-3 rounded-xl font-bold text-sm"
              >
                عرض كل المشاريع
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 gradient-primary pattern-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              eyebrow="فرص حصرية"
              title="لا تفوّت فرصة الدخول المبكر"
              description="أسعار ما قبل الإطلاق دائمًا أفضل. تواصل مع فريق لقمان الآن وسنطلعك على المشاريع الجديدة قبل الإعلان عنها."
              light
            />
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-4 rounded-2xl shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              تواصل معنا عبر واتساب للحصول على عروض حصرية
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
