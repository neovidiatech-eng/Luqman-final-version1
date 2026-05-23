'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, MessageCircle, Copy, Share2 } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { type BlogPost } from '../data/properties';
import { getBlogPosts } from '../lib/content-service';

const criteria = [
  {
    num: '١',
    title: 'حدد قدرتك المالية والميزانية الواقعية',
    content: 'لا تبدأ بالبحث عن العقار قبل معرفة قدرتك الشرائية بدقة. احسب رأس المال المتوفر لديك وقيمة التمويل العقاري المتاح لك من البنوك وجهات التمويل بالمملكة، بالإضافة إلى احتساب المصاريف الإضافية (مثل السعي وضريبة التصرفات العقارية والتأثيث).',
    tip: 'احرص على ألا تزيد التزاماتك العقارية الشهرية عن النسبة التي تتيح لك العيش بارتياح دون ضغوط مالية.',
  },
  {
    num: '٢',
    title: 'دراسة الموقع الجغرافي والحي',
    content: 'الموقع هو المعيار الأهم في قيمة العقار واستقراره. ابحث عن الأحياء ذات المستقبل الواعد والمخططة بشكل جيد. تأكد من توفر الخدمات الأساسية (المدارس، المستشفيات، مراكز التسوق) وسهولة الوصول للطرق الرئيسية.',
    tip: 'قم بزيارة الحي في أوقات مختلفة (صباحاً ومساءً وفي أوقات الذروة) لمعرفة مستوى الازدحام والهدوء.',
  },
  {
    num: '٣',
    title: 'تقييم المساحة والتصميم الداخلي لملاءمة احتياجاتك',
    content: 'اختر مساحة تناسب حجم أسرتك الحالي والمستقبلي. التصميم الداخلي الذكي وتوزيع الغرف الجيد أحياناً يكون أهم من المساحة الإجمالية الكبيرة. احرص على وجود تهوية جيدة وإضاءة طبيعية كافية.',
    tip: null,
  },
  {
    num: '٤',
    title: 'التحقق من جودة البناء والضمانات العقارية',
    content: 'عند شراء عقار جاهز (شقة أو فيلا)، يجب عليك التحقق من وجود ضمانات الهيكل الإنشائي، وضمانات السباكة والكهرباء، وعزل المياه. تأكد من الحصول على شهادة الأشغال وشهادة التأمين ضد العيوب الخفية.',
    tip: 'التعامل مع مطورين عقاريين ذوي سمعة طيبة يضمن لك راحة البال وجودة مواد التشطيب المستخدمة.',
  },
  {
    num: '٥',
    title: 'مقارنة أسعار العقارات المشابهة في نفس المنطقة',
    content: 'قبل اتخاذ قرار الشراء، قم بعمل مسح سريع لأسعار المتر المربع في نفس الحي للعقارات المشابهة. يمكنك استخدام المؤشرات العقارية الرسمية المتاحة عبر موقع الهيئة العامة للعقار للوقوف على القيمة السوقية الحقيقية.',
    tip: 'فروق الأسعار البسيطة قد تخفي وراءها اختلافات جوهرية في جودة التشطيب أو الضمانات، فاحرص على المقارنة الشاملة.',
  },
  {
    num: '٦',
    title: 'الاستعانة بمستشار ووسيط عقاري مرخص',
    content: 'الوسيط العقاري المرخص يمتلك المعرفة الكافية بالقوانين والأنظمة ويحميك من الدخول في صفقات غير آمنة أو معقدة قانونياً. نحن في شركة لقمان للتسويق العقاري نوفر لعملائنا استشارات متكاملة ونساعدهم في اختيار العقار الأنسب وخطط التقسيط الأكثر مرونة.',
    tip: null,
  },
];

export default function BlogArticle3Page() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let active = true;
    getBlogPosts().then((items) => {
      if (active && items.length > 0) setPosts(items);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = posts.filter((p) => p.slug !== 'how-to-choose-right-property');

  return (
    <div className="min-h-screen pt-20">
      <div className="reading-progress" style={{ width: `${progress}%` }} />

      {/* Breadcrumb */}
      <div className="bg-cream border-b border-[var(--color-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">الرئيسية</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <Link href="/blog" className="hover:text-primary">المدونة</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span className="text-primary font-semibold truncate max-w-xs">كيف تختار العقار المناسب</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                شراء العقار
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-4 leading-tight">
                كيف تختار العقار المناسب في السعودية — معايير الاختيار الذكي
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> 25 يناير 2025
                </span>

                <button onClick={handleCopy} className="flex items-center gap-1 hover:text-primary transition-colors">
                  {copied ? <span className="text-green-500">تم النسخ!</span> : <><Copy className="w-4 h-4" /> نسخ الرابط</>}
                </button>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[250px] sm:h-[400px] rounded-3xl overflow-hidden border border-gold/10 shadow-lg mb-8 bg-cream flex items-center justify-center relative"
            >
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
                alt="كيف تختار العقار المناسب في السعودية"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Intro */}
            <div className="bg-cream border border-[var(--color-border)] rounded-2xl p-6 mb-8">
              <p className="text-gray-700 leading-relaxed text-base">
                اتخاذ قرار شراء عقار ليس بالأمر البسيط، فهو استثمار للمستقبل وقد يحدد مسار حياتك وحياة عائلتك لسنوات طويلة. في هذا الدليل، نستعرض معكم أهم المعايير والنصائح التي تجعل اختياركم مدروساً وناجحاً.
              </p>
            </div>

            {/* Criteria Steps */}
            <div className="space-y-8">
              {criteria.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex gap-5">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-lg mt-1">
                      {item.num}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-extrabold text-primary-dark mb-3">{item.title}</h2>
                      <div className="text-gray-600 leading-relaxed text-base mb-3">
                        {item.content}
                      </div>
                      {item.tip && (
                        <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 flex items-start gap-3">
                          <span className="text-gold font-bold text-sm shrink-0">💡 نصيحة:</span>
                          <p className="text-gray-700 text-sm leading-relaxed">{item.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-10 bg-primary rounded-2xl p-6 text-white">
              <h2 className="font-bold text-xl mb-3">الخلاصة</h2>
              <p className="text-white/80 leading-relaxed">
                الاختيار الذكي للعقار يتطلب الموازنة بين احتياجاتك الحالية والمستقبلية وقدرتك المالية، مع ضرورة التحقق من كافة جوانب الجودة والتراخيص. تواصل مع خبراء العقار لتجنب العثرات وتوفير الجهد والمال.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-4 rounded-2xl shadow-[0_8px_30px_rgba(37,211,102,0.4)]"
              >
                <MessageCircle className="w-5 h-5" />
                استشر مستشارنا العقاري مجاناً
              </a>
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-gray-100">
              <span className="text-sm text-gray-500 font-semibold">مشاركة:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('كيف تختار العقار المناسب في السعودية — ' + pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> واتساب
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('معايير اختيار العقار المناسب')}&url=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" /> تويتر
              </a>
              <button
                onClick={handleCopy}
                className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? 'تم!' : 'نسخ الرابط'}
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-[var(--color-border)] sticky top-24">
              <h3 className="font-bold text-primary-dark text-sm mb-3">خطوات الاختيار</h3>
              <ol className="space-y-2">
                {criteria.map((c) => (
                  <li key={c.num} className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-5 h-5 bg-primary/10 text-primary rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">
                      {c.num}
                    </span>
                    <span className="line-clamp-1">{c.title}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  تواصل معنا
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="font-extrabold text-xl text-primary-dark mb-8">مقالات ذات صلة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
