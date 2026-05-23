import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, MessageCircle, Share2, Copy } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/properties';

const steps = [
  {
    num: '١',
    title: 'حدد هدفك من العقار',
    content: `قبل أي شيء، اسأل نفسك: لماذا أشتري هذا العقار؟

للاستقرار الأسري: ركّز على حي هادئ، قريب من المدارس والخدمات، بمساحة تناسب أسرتك.
للاستثمار وتنمية المال: ركّز على عقار قيمته ستزيد مع الوقت، كمحلات في مناطق نامية أو أراضٍ استراتيجية.`,
    tip: 'وضوح هدفك من البداية يوفر عليك أشهرًا من التردد والبحث العشوائي.',
  },
  {
    num: '٢',
    title: 'رتّب ميزانيتك ومصدر التمويل',
    content: `قبل أن تبدأ البحث، اعرف من أين ستدفع:

الكاش يسرّع الإجراءات ويفتح لك باب التفاوض على سعر أفضل.
التمويل العقاري عبر البنوك السعودية المعتمدة قد يوفر حلولًا مرنة حسب أهلية العميل.`,
    tip: 'احسب راتبك وأعباءك الشهرية قبل الالتزام بأي قسط. القاعدة العامة ألا يتجاوز القسط 35% من دخلك الشهري.',
  },
  {
    num: '٣',
    title: 'اختر وسيطك العقاري بعناية',
    content: `الوسيط ليس مجرد بائع، هو شريكك في أهم قرار مالي في حياتك. ابحث عن:

الترخيص: تأكد أنه مرخص من هيئة العقار السعودية.
الشفافية: يخبرك بالمزايا والعيوب منذ البداية.
الخبرة: كلما طالت سنوات خبرته في السوق المحلي، كانت نصيحته أدق.

فريق لقمان، بخبرة 15 عامًا ومبيعات تجاوزت 100 مليون ريال، يتعامل مع كل عميل باهتمام كامل.`,
    tip: null,
  },
  {
    num: '٤',
    title: 'اقرأ العقد باهتمام',
    content: `العقد هو ضمانك. لا تتسرع في التوقيع قبل التأكد من:

السعر النهائي الكامل بلا رسوم مخفية.
المواصفات الدقيقة للعقار.
موعد التسليم والضمانات.
شروط الفسخ وحقوقك في حالة الخلاف.`,
    tip: null,
  },
  {
    num: '٥',
    title: 'زر العقار بنفسك',
    content: `لا تشترِ من الصور فقط. الزيارة الميدانية ضرورة. لاحظ:

جودة التشطيبات.
الإضاءة الطبيعية والتهوية.
المساحة الفعلية.
الحي المحيط.
مستوى الخصوصية والهدوء.`,
    tip: null,
  },
  {
    num: '٦',
    title: 'استلم العقار بعين خبير',
    content: `يوم الاستلام هو يوم الاحتفال، لكن احتفل بعد الفحص. افحص:

الكهرباء والسباكة والتكييف.
الدهانات والتشطيبات.
الأبواب والنوافذ والأقفال.
أي تلف أو نقص مقارنة بالعقد.`,
    tip: null,
  },
];

export default function BlogArticle1Page() {
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

  const relatedPosts = blogPosts.filter((p) => p.slug !== 'how-to-buy-property-in-saudi-arabia');

  return (
    <div className="min-h-screen pt-20">
      {/* Reading progress bar */}
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
      />

      {/* Breadcrumb */}
      <div className="bg-cream border-b border-[var(--color-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <Link to="/blog" className="hover:text-primary">المدونة</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span className="text-primary font-semibold truncate max-w-xs">خطوات شراء عقار في السعودية</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Article */}
          <article className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                شراء العقار
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-4 leading-tight">
                شراء عقارك في السعودية لأول مرة — دليل خطوة بخطوة
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> 15 يناير 2025
                </span>

                <button onClick={handleCopy} className="flex items-center gap-1 hover:text-primary transition-colors">
                  {copied ? <span className="text-green-500">تم النسخ!</span> : <><Copy className="w-4 h-4" /> نسخ الرابط</>}
                </button>
              </div>
            </motion.div>

            {/* Intro */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="bg-cream rounded-2xl p-6 border border-[var(--color-border)] mb-8">
                <p className="text-gray-700 leading-relaxed text-base">
                  شراء أول بيت في حياتك لحظة لا تُنسى. خليط من الحماس والتساؤلات: هل اخترت المكان المناسب؟ ما الأوراق المطلوبة؟ هل سيوافق البنك؟ هل الوسيط موثوق؟
                </p>
                <p className="text-gray-700 leading-relaxed text-base mt-3">
                  في هذا الدليل، سنمشي معك خطوة بخطوة كأننا نشتري معك، حتى تصل للحظة تمسك فيها مفتاح بيتك وأنت واثق.
                </p>
              </div>
            </motion.div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex gap-5">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-lg mt-1">
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-extrabold text-primary-dark mb-3">{step.title}</h2>
                      <div className="text-gray-600 leading-relaxed whitespace-pre-line text-base mb-3">
                        {step.content}
                      </div>
                      {step.tip && (
                        <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 flex items-start gap-3">
                          <span className="text-gold font-bold text-sm shrink-0">💡 نصيحة:</span>
                          <p className="text-gray-700 text-sm">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-10 bg-cream rounded-2xl p-6 border border-[var(--color-border)]">
              <h2 className="font-bold text-xl text-primary-dark mb-3">الخلاصة</h2>
              <p className="text-gray-600 leading-relaxed">
                شراء عقار في السعودية أسهل بكثير لو كانت معك الخريطة الصحيحة. ابدأ بتحديد هدفك، ورتّب ميزانيتك، واختر وسيطًا يعمل لمصلحتك. نحن في لقمان هنا لنساعدك تفتح بابًا جديدًا في حياتك.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-4 rounded-2xl shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                تحدث مع فريق لقمان عبر واتساب
              </a>
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-gray-100">
              <span className="text-sm text-gray-500 font-semibold">مشاركة:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('خطوات شراء عقار في السعودية لأول مرة — ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> واتساب
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('خطوات شراء عقار في السعودية لأول مرة')}&url=${encodeURIComponent(window.location.href)}`}
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
            {/* TOC */}
            <div className="bg-white rounded-2xl p-5 border border-[var(--color-border)] sticky top-24">
              <h3 className="font-bold text-primary-dark text-sm mb-3">محتويات المقالة</h3>
              <ol className="space-y-2">
                {steps.map((step) => (
                  <li key={step.num}>
                    <a href={`#step-${step.num}`} className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-2">
                      <span className="w-5 h-5 bg-primary/10 text-primary rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">
                        {step.num}
                      </span>
                      {step.title}
                    </a>
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
