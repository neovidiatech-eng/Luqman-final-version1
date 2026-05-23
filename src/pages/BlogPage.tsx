import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import { blogPosts } from '../data/properties';

const ITEMS_PER_PAGE = 6;

const categories = ['الكل', 'شراء العقار', 'التمويل والتقسيط', 'الاستثمار العقاري', 'نصائح قانونية', 'أخبار السوق السعودي'];

export default function BlogPage() {
  const [category, setCategory] = useState('الكل');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = blogPosts.filter((p) => category === 'الكل' || p.category === category);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedPosts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="gradient-hero py-20 pattern-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5">
              <span className="text-gold text-sm font-semibold">معرفة عقارية حقيقية</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              مدونة لقمان — معرفة عقارية تنفعك
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              مقالات إثرائية متنوعة عن العقارات بالمملكة. دليلك لاتخاذ قرارات عقارية واثقة ومبنية على معرفة حقيقية.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40V20C360 0 720 40 1080 20 1260 10 1380 16 1440 20V40H0z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Desktop: pills */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                  category === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile: dropdown */}
          <div className="sm:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="w-full flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-primary-dark"
            >
              <span>{category}</span>
              <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full mt-2 right-0 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { handleCategoryChange(cat); setDropdownOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${
                        category === cat
                          ? 'bg-primary/5 text-primary'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-12 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader
              eyebrow="المقالات"
              title={`${filtered.length} مقال`}
              align="right"
            />
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
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
              <p className="text-xl font-bold text-primary-dark mb-4">لا توجد مقالات في هذا التصنيف</p>
              <button
                onClick={() => setCategory('الكل')}
                className="btn-primary px-6 py-3 rounded-xl font-bold text-sm"
              >
                عرض كل المقالات
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
