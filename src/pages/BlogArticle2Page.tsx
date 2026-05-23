import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, MessageCircle, Copy, Share2 } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/properties';

const mistakes = [
  {
    num: '١',
    title: 'الشراء بعاطفة لا بمنطق',
    content: 'أجمل شقة ليست بالضرورة الأفضل لك. كثيرون يقعون في حب العقار من النظرة الأولى ويتجاهلون عيوبًا جوهرية كالموقع أو السعر الزائد أو ضعف البنية التحتية.',
    solution: 'ضع معاييرك على الورق قبل الزيارة: مساحة، موقع، سعر، نظام دفع. ولا تحِد عنها.',
  },
  {
    num: '٢',
    title: 'إهمال التحقق من ترخيص الوسيط',
    content: 'الوسيط غير المرخص قد يعرّض صفقتك للمشاكل القانونية لاحقًا. هيئة العقار السعودية تلزم الوسطاء بالترخيص لحماية حقوق المشتري.',
    solution: 'اطلب رقم الترخيص وتحقق منه على موقع هيئة العقار مباشرة.',
  },
  {
    num: '٣',
    title: 'الاعتماد على الصور فقط',
    content: 'الصور قد تخدع. حتى الشقة الرائعة على الصور قد تكون مظلمة أو في حي مزدحم أو بتشطيبات رديئة عن قرب.',
    solution: 'لا توقّع عقدًا قبل الزيارة الميدانية دائمًا.',
  },
  {
    num: '٤',
    title: 'عدم قراءة العقد بدقة',
    content: 'رسوم مخفية، مواعيد تسليم ضبابية، شروط فسخ جائرة — كلها تختبئ في التفاصيل التي لم يقرأها أحد.',
    solution: 'خذ وقتك، اطلب نسخة العقد قبل يوم التوقيع، واستشر وسيطًا مرخصًا.',
  },
  {
    num: '٥',
    title: 'تجاوز الميزانية الحقيقية',
    content: 'كثيرون يحسبون سعر العقار فقط وينسون رسوم التسجيل، رسوم الوسيط، ضريبة القيمة المضافة، ورسوم نقل الملكية.',
    solution: 'ضع في حسبانك 5% إلى 10% فوق سعر العقار للمصاريف الجانبية.',
  },
  {
    num: '٦',
    title: 'اختيار الموقع بشكل عشوائي',
    content: 'الموقع هو الثابت الوحيد الذي لا يتغير في العقار. عقار رخيص في موقع سيئ قد يكون خسارة على المدى البعيد.',
    solution: 'ابحث في البنية التحتية للحي، خطط التطوير المستقبلية، والقرب من الخدمات.',
  },
  {
    num: '٧',
    title: 'التسرع في القرار تحت الضغط',
    content: '"الفرصة ستضيع" أو "عميل آخر مهتم" عبارات تُستخدم أحيانًا للضغط. قرار العقار يحتاج تفكيرًا وليس تسرعًا.',
    solution: 'الوسيط الموثوق لن يضغط عليك. سيعطيك الوقت الكافي ويقدم لك المعلومات الكاملة.',
  },
];

export default function BlogArticle2Page() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = blogPosts.filter((p) => p.slug !== 'common-mistakes-first-time-buyers');

  return (
    <div className="min-h-screen pt-20">
      <div className="reading-progress" style={{ width: `${progress}%` }} />

      {/* Breadcrumb */}
      <div className="bg-cream border-b border-[var(--color-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <Link to="/blog" className="hover:text-primary">المدونة</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span className="text-primary font-semibold truncate max-w-xs">أخطاء شراء أول عقار</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                نصائح قانونية
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-4 leading-tight">
                أخطاء شائعة عند شراء أول عقار — تجنبها قبل فوات الأوان
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> 20 يناير 2025
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
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="أخطاء شائعة عند شراء أول عقار"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Intro */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 leading-relaxed text-base">
                كثير من المشترين لأول مرة يقعون في أخطاء تكلفهم آلاف الريالات أو تجعلهم يندمون على قرارهم لسنوات. الخبر الجيد أن معظمها يمكن تجنبه تمامًا إذا عرفته مسبقًا.
              </p>
            </div>

            {/* Mistakes */}
            <div className="space-y-6">
              {mistakes.map((mistake, i) => (
                <motion.div
                  key={mistake.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-5 border-b border-gray-50">
                    <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-full flex items-center justify-center text-red-500 font-extrabold shrink-0">
                      {mistake.num}
                    </div>
                    <h2 className="font-extrabold text-lg text-primary-dark">{mistake.title}</h2>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 leading-relaxed mb-4">{mistake.content}</p>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                      <span className="text-emerald-600 font-bold text-sm shrink-0">✓ الحل:</span>
                      <p className="text-gray-700 text-sm leading-relaxed">{mistake.solution}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-10 bg-primary rounded-2xl p-6 text-white">
              <h2 className="font-bold text-xl mb-3">الخلاصة</h2>
              <p className="text-white/80 leading-relaxed">
                هذه الأخطاء ليست نادرة، وكثير من الناس وقعوا فيها. لكن القراءة وحدها لا تكفي، أنت تحتاج وسيطًا يرافقك ويحمي مصلحتك. في لقمان، نفخر بأن عملاءنا يستلمون عقاراتهم وهم راضون لأننا بنينا الثقة قبل الصفقة.
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
                تحدث مع مستشارنا العقاري الآن
              </a>
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-gray-100">
              <span className="text-sm text-gray-500 font-semibold">مشاركة:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('أخطاء شائعة عند شراء أول عقار — ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> واتساب
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('أخطاء شراء العقار في السعودية')}&url=${encodeURIComponent(window.location.href)}`}
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
          <aside>
            <div className="bg-white rounded-2xl p-5 border border-[var(--color-border)] sticky top-24">
              <h3 className="font-bold text-primary-dark text-sm mb-3">الأخطاء السبعة</h3>
              <ol className="space-y-2">
                {mistakes.map((m) => (
                  <li key={m.num} className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-5 h-5 bg-red-50 text-red-500 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">
                      {m.num}
                    </span>
                    <span className="line-clamp-1">{m.title}</span>
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
