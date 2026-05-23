import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Building2, Calendar, CheckCircle, Shield, ArrowRight,
  CreditCard, Download, Phone, Share2, X, Copy, Check,
  Play, ChevronLeft, ChevronRight, Images
} from 'lucide-react';
import { sampleProjects } from '../data/properties';
import ContactForm from '../components/ContactForm';

const ProjectVisual = () => (
  <div className="w-full h-full gradient-primary flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 pattern-bg opacity-20" />
    {/* Skyline */}
    <svg viewBox="0 0 400 200" fill="none" className="absolute bottom-0 w-full h-2/3 opacity-20">
      <rect x="20" y="80" width="40" height="120" fill="white"/>
      <rect x="65" y="50" width="30" height="150" fill="white"/>
      <rect x="100" y="70" width="50" height="130" fill="white"/>
      <rect x="155" y="20" width="40" height="180" fill="white"/>
      <rect x="200" y="60" width="35" height="140" fill="white"/>
      <rect x="240" y="40" width="45" height="160" fill="white"/>
      <rect x="290" y="75" width="30" height="125" fill="white"/>
      <rect x="325" y="90" width="55" height="110" fill="white"/>
    </svg>
    <div className="relative z-10 text-center">
      <div className="text-5xl mb-3">🏙️</div>
      <p className="text-white/60 text-sm">مشروع عقاري</p>
    </div>
  </div>
);

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = sampleProjects.find((p) => p.slug === slug);
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
  const shareTitle = project?.title ?? '';

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
    `https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/2africans-3288793/pexels-photo-3288793.jpeg?auto=compress&cs=tinysrgb&w=800`,
  ].filter((_, i) => i < 5);
  const galleryImagesClean = [
    `https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800`,
  ];
  const galleryVideos = [
    { thumb: `https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800`, label: 'جولة شاملة في المشروع' },
    { thumb: `https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800`, label: 'الموقع والمحيط' },
  ];
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prevImg = () => setLightbox((i) => (i !== null ? (i - 1 + galleryImagesClean.length) % galleryImagesClean.length : 0));
  const nextImg = () => setLightbox((i) => (i !== null ? (i + 1) % galleryImagesClean.length : 0));

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-dark mb-4">المشروع غير موجود</p>
          <Link to="/projects" className="btn-primary px-6 py-3 rounded-xl font-bold text-sm">
            العودة للمشاريع
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
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <Link to="/projects" className="hover:text-primary">المشاريع</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span className="text-primary font-semibold">{project.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden h-80 sm:h-96 shadow-[var(--shadow-soft)]"
            >
              <ProjectVisual />
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"
            >
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
                      {tab === 'photos' ? `الصور (${galleryImagesClean.length})` : `الفيديوهات (${galleryVideos.length})`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                {activeTab === 'photos' ? (
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImagesClean.map((src, i) => (
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
                            {galleryImagesClean.length} صورة
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
                    src={galleryImagesClean[lightbox]}
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
                    {lightbox + 1} / {galleryImagesClean.length}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Title */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${
                  project.deliveryStatus === 'مكتمل' ? 'bg-emerald-500' :
                  project.deliveryStatus === 'قيد الإنشاء' ? 'bg-amber-500' : 'bg-blue-500'
                }`}>
                  {project.deliveryStatus}
                </span>
                <span className="bg-gold/10 text-gold-dark text-xs font-bold px-3 py-1 rounded-full">
                  {project.type}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-primary-dark leading-snug flex-1">
                  {project.title}
                </h1>
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
                <span>{project.location}، {project.city}</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Building2, label: 'الوحدات', value: `${project.units} وحدة` },
                { icon: Calendar, label: 'الحالة', value: project.deliveryStatus },
                { icon: CreditCard, label: 'السعر يبدأ من', value: `${project.startingPrice.toLocaleString('ar-SA')} ريال` },
                { icon: Shield, label: 'المطور', value: project.developer.split(' ').slice(0, 2).join(' ') },
              ].map((s) => (
                <div key={s.label} className="bg-cream rounded-xl p-4 border border-[var(--color-border)] text-center">
                  <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                  <p className="font-bold text-primary-dark text-sm">{s.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-[var(--color-border)]"
            >
              <h2 className="font-bold text-lg text-primary-dark mb-4">عن المشروع</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-6 border border-[var(--color-border)]"
            >
              <h2 className="font-bold text-lg text-primary-dark mb-4">مميزات المشروع</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 bg-cream rounded-xl px-3 py-2.5">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Available Units */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="font-bold text-lg text-primary-dark">الوحدات المتاحة</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-cream">
                    <tr>
                      {['نوع الوحدة', 'المساحة م²', 'السعر', 'الطابق', 'الحالة'].map((h) => (
                        <th key={h} className="text-right px-5 py-3 font-bold text-gray-600 text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {project.availableUnits.map((unit, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-cream transition-colors">
                        <td className="px-5 py-4 font-semibold text-primary-dark">{unit.type}</td>
                        <td className="px-5 py-4 text-gray-600">{unit.area} م²</td>
                        <td className="px-5 py-4 font-bold text-primary">{unit.price.toLocaleString('ar-SA')} ريال</td>
                        <td className="px-5 py-4 text-gray-600">{unit.floor}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            unit.status === 'متاح' ? 'bg-emerald-100 text-emerald-700' :
                            unit.status === 'محجوز' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {unit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Payment Plan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="bg-gradient-to-br from-gold-dark to-gold rounded-2xl p-6 text-white"
            >
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                خطة الدفع
              </h2>
              <p className="text-2xl font-extrabold">{project.paymentPlan}</p>
            </motion.div>

            {/* Developer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-cream rounded-2xl p-6 border border-[var(--color-border)]"
            >
              <h2 className="font-bold text-lg text-primary-dark mb-3">المطور العقاري</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-primary-dark">{project.developer}</p>
                  <p className="text-xs text-gray-400">شريك معتمد مع لقمان للتسويق العقاري</p>
                </div>
              </div>
            </motion.div>

            {/* Downloads */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
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
          </div>

          {/* Sidebar */}
          <div>
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

              <div className="mb-5">
                <p className="text-xs text-gray-400 mb-1">السعر يبدأ من</p>
                <p className="text-3xl font-extrabold text-primary">
                  {project.startingPrice.toLocaleString('ar-SA')} ريال
                </p>
              </div>

              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mb-5 hover:bg-[#1ebe5d] transition-colors"
              >
                <Phone className="w-4 h-4" />
                تواصل عبر واتساب
              </a>

              <div className="border-t border-gray-100 pt-5">
                <h3 className="font-bold text-sm text-primary-dark mb-3">أو أرسل استفسارك</h3>
                <ContactForm propertyTitle={project.title} compact />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
