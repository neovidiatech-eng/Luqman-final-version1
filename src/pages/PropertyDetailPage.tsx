import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Maximize2, BedDouble, Bath, Calendar, Building2, Shield,
  CheckCircle, ArrowRight, Share2, Phone, X, Copy, Check,
  Play, ChevronLeft, ChevronRight, Images, Download
} from 'lucide-react';
import { sampleProperties } from '../data/properties';
import ContactForm from '../components/ContactForm';

const featureIcons: Record<string, string> = {
  'مكيف مركزي': '❄️',
  'موقف سيارات خاص': '🚗',
  'حديقة أو فناء': '🌿',
  'مصعد': '🛗',
  'أمن وحراسة 24 ساعة': '🔒',
  'مطبخ مجهز': '🍳',
  'مسبح': '🏊',
  'موقف سيارات': '🅿️',
  'موقف خاص': '🚗',
  'صك حر': '📋',
  'شارعين': '🛣️',
  'مرافق جاهزة': '⚡',
  'واجهة تجارية': '🏪',
  'تشطيب جاهز': '🏗️',
  'مكيف': '❄️',
};

const PropertyVisual = ({ type }: { type: string }) => (
  <div className="w-full h-full gradient-primary flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 pattern-bg opacity-30" />
    <div className="absolute inset-0">
      <svg viewBox="0 0 400 250" fill="none" className="w-full h-full opacity-10">
        <rect x="50" y="140" width="300" height="110" rx="4" fill="white"/>
        <path d="M200 80L80 150v100h80V200h80v50h80V150L200 80z" fill="white" fillOpacity="0.5"/>
        <rect x="85" y="195" width="280" height="8" rx="4" fill="white" fillOpacity="0.5"/>
      </svg>
    </div>
    <div className="relative text-center z-10">
      <div className="text-6xl mb-3">
        {type === 'فلل' ? '🏡' : type === 'أراضي' ? '🌍' : type === 'عقارات تجارية' ? '🏪' : '🏢'}
      </div>
      <p className="text-white/60 text-sm">{type}</p>
    </div>
  </div>
);

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const property = sampleProperties.find((p) => p.slug === slug);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pageUrl = window.location.href;
  const shareTitle = property?.title ?? '';

  const socialLinks = [
    { name: 'واتساب', color: 'bg-[#25D366]', url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + pageUrl)}`, icon: '💬' },
    { name: 'تويتر / X', color: 'bg-black', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(pageUrl)}`, icon: '𝕏' },
    { name: 'فيسبوك', color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, icon: 'f' },
    { name: 'تيليجرام', color: 'bg-[#0088CC]', url: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareTitle)}`, icon: '✈' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const galleryImages = [
    `https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/2029665/pexels-photo-2029665.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=800`,
  ];
  const galleryVideos = [
    { thumb: `https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800`, label: 'جولة داخلية — الصالة والغرف' },
    { thumb: `https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800`, label: 'جولة خارجية — الواجهة والموقع' },
  ];
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prevImg = () => setLightbox((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : 0));
  const nextImg = () => setLightbox((i) => (i !== null ? (i + 1) % galleryImages.length : 0));

  if (!property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-dark mb-4">العقار غير موجود</p>
          <Link to="/properties" className="btn-primary px-6 py-3 rounded-xl font-bold text-sm">
            العودة للعقارات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-[var(--color-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <Link to="/properties" className="hover:text-primary transition-colors">العقارات</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span className="text-primary font-semibold truncate max-w-xs">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden h-80 sm:h-96 shadow-[var(--shadow-soft)]"
            >
              <PropertyVisual type={property.type} />
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"
            >
              {/* Tabs */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Images className="w-4 h-4 text-primary" />
                  <h2 className="font-bold text-base text-primary-dark">معرض الصور والفيديوهات</h2>
                </div>
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                  {(['photos', 'videos'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                        activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      {tab === 'photos' ? `الصور (${galleryImages.length})` : `الفيديوهات (${galleryVideos.length})`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                {activeTab === 'photos' ? (
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setLightbox(i)}
                        className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'col-span-3 h-52' : 'h-28'}`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                          <Images className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {i === 0 && (
                          <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                            {galleryImages.length} صورة
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {galleryVideos.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => alert('سيتوفر الفيديو قريبًا. تواصل معنا للحصول على جولة مصورة.')}
                        className="relative overflow-hidden rounded-xl group h-40"
                      >
                        <img src={v.thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-2">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-primary fill-primary mr-[-2px]" />
                          </div>
                          <p className="text-white text-xs font-semibold px-3 text-center">{v.label}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
              {lightbox !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                  onClick={() => setLightbox(null)}
                >
                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    onClick={() => setLightbox(null)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    onClick={(e) => { e.stopPropagation(); prevImg(); }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <motion.img
                    key={lightbox}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    src={galleryImages[lightbox]}
                    alt=""
                    className="max-h-[85vh] max-w-full rounded-xl object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    onClick={(e) => { e.stopPropagation(); nextImg(); }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                    {lightbox + 1} / {galleryImages.length}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Title & Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      property.status === 'متاح' ? 'bg-emerald-100 text-emerald-700' :
                      property.status === 'محجوز' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {property.status}
                    </span>
                    {property.isNew && (
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">جديد</span>
                    )}
                    {property.financeAvailable && (
                      <span className="bg-gold/10 text-gold-dark text-xs font-bold px-3 py-1 rounded-full">تمويل متاح</span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-primary-dark leading-snug">
                    {property.title} — {property.type} في {property.city}
                  </h1>
                </div>
                <div className="relative shrink-0" ref={shareRef}>
                  <button
                    onClick={() => setShareOpen((o) => !o)}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {shareOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-52 z-50"
                      >
                        <div className="flex items-center justify-between mb-2 px-1">
                          <p className="text-xs font-bold text-gray-500">مشاركة عبر</p>
                          <button onClick={() => setShareOpen(false)}><X className="w-3.5 h-3.5 text-gray-400" /></button>
                        </div>
                        <div className="space-y-1.5">
                          {socialLinks.map((s) => (
                            <a
                              key={s.name}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setShareOpen(false)}
                              className={`${s.color} text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-3 hover:opacity-90 transition-opacity`}
                            >
                              <span className="text-base leading-none">{s.icon}</span>
                              {s.name}
                            </a>
                          ))}
                          <button
                            onClick={handleCopy}
                            className="w-full border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-3 hover:border-primary hover:text-primary transition-colors"
                          >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'تم النسخ!' : 'نسخ الرابط'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{property.district}، {property.city}</span>
              </div>
            </motion.div>

            {/* Key Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-cream rounded-2xl p-6 border border-[var(--color-border)]"
            >
              <h2 className="font-bold text-lg text-primary-dark mb-5">تفاصيل العقار</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Maximize2, label: 'المساحة', value: `${property.area} م²` },
                  ...(property.rooms > 0 ? [{ icon: BedDouble, label: 'غرف النوم', value: `${property.rooms} غرفة` }] : []),
                  ...(property.bathrooms > 0 ? [{ icon: Bath, label: 'الحمامات', value: `${property.bathrooms} حمام` }] : []),
                  ...(property.floor ? [{ icon: Building2, label: 'الطابق', value: `الطابق ${property.floor}` }] : []),
                  { icon: Shield, label: 'الحالة', value: property.status },
                  { icon: Calendar, label: 'تاريخ الإضافة', value: property.addedDate },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 border border-[var(--color-border)]">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="text-xs text-gray-400">{item.label}</span>
                    </div>
                    <p className="font-bold text-primary-dark text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-[var(--color-border)]"
            >
              <h2 className="font-bold text-lg text-primary-dark mb-4">وصف العقار</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </motion.div>

            {/* Features */}
            {property.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl p-6 border border-[var(--color-border)]"
              >
                <h2 className="font-bold text-lg text-primary-dark mb-4">المميزات والمرافق</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 bg-cream rounded-xl px-3 py-2.5">
                      <span className="text-base">{featureIcons[feat] || '✓'}</span>
                      <span className="text-sm text-gray-700 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Downloads */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="bg-white rounded-2xl p-6 border border-[var(--color-border)]"
            >
              <h2 className="font-bold text-lg text-primary-dark mb-4">تحميل الملفات</h2>
              <div className="flex flex-wrap gap-3">
                {['تحميل البروشور', 'مخطط الطابق', 'العقد المبدئي'].map((doc) => (
                  <button
                    key={doc}
                    onClick={() => alert('سيتوفر هذا الملف قريبًا. تواصل معنا للحصول عليه.')}
                    className="flex items-center gap-2 border border-primary text-primary px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    {doc}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="gradient-primary rounded-2xl p-6 text-white"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">السعر الإجمالي</p>
                  <p className="text-4xl font-extrabold text-gold">
                    {property.price.toLocaleString('ar-SA')} ريال
                  </p>
                  {property.financeAvailable && (
                    <p className="text-white/70 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-gold" />
                      تمويل بنكي متاح
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/966500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    واتساب
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-soft)] sticky top-24"
            >
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-primary-dark text-sm">فريق لقمان</p>
                  <p className="text-xs text-gray-400">وسيط مرخص من هيئة العقار</p>
                </div>
              </div>

              <h3 className="font-bold text-base text-primary-dark mb-1">
                تواصل معنا للاستفسار عن هذا العقار
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                فريق لقمان جاهز للإجابة على استفساراتك وترتيب زيارة ميدانية.
              </p>

              <ContactForm propertyTitle={property.title} compact />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
