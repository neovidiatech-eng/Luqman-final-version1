import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Award, Heart, TrendingUp, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AnimatedCounter from '../components/AnimatedCounter';

const timeline = [
  { year: '2009', title: 'البداية', desc: 'انطلقت لقمان بقناعة راسخة: كل عميل يستحق وسيطًا صادقًا يعمل لمصلحته.' },
  { year: '2013', title: 'التوسع', desc: 'بدأنا التوسع في تغطية أبرز المدن السعودية وبناء شراكاتنا الأولى مع المطورين.' },
  { year: '2018', title: 'شراكات المطورين', desc: 'وصلنا لاتفاقيات حصرية مع كبار المطورين العقاريين المعتمدين في المملكة.' },
  { year: '2024', title: 'مئة مليون ريال', desc: 'تجاوزت مبيعاتنا الموثقة 100 مليون ريال مع أكثر من مطور عقاري معتمد.' },
];

const values = [
  {
    icon: Shield,
    title: 'الشفافية أولًا',
    desc: 'نخبرك بالمزايا والعيوب من البداية. ليس هدفنا إتمام الصفقة، بل رضاك بعدها.',
    color: 'from-primary to-primary-light',
  },
  {
    icon: Award,
    title: 'الترخيص يحميك',
    desc: 'ترخيصنا من هيئة العقار يعني أن كل تعامل بينك وبيننا محمي قانونيًا.',
    color: 'from-gold-dark to-gold',
  },
  {
    icon: Heart,
    title: 'أنت الأولوية',
    desc: 'لسنا وكالة ضخمة تتعامل معك كرقم. أنت العميل الأهم في وقتك معنا.',
    color: 'from-primary-light to-primary',
  },
  {
    icon: TrendingUp,
    title: 'مصلحتك على المدى البعيد',
    desc: 'العقار قرار لسنوات. ننصحك بما يبني مستقبلك.',
    color: 'from-gold to-gold-dark',
  },
];

const stats = [
  { end: 15, suffix: '+', label: 'عامًا من الخبرة في السوق العقاري السعودي' },
  { end: 100, suffix: '+', label: 'مليون ريال مبيعات موثقة مع أكثر من مطور معتمد' },
  { end: 299, suffix: 'K', label: 'ريال — بداية الأسعار في متناول يدك' },
  { end: 6, suffix: '', label: 'مدن رئيسية مغطاة في أبرز مدن المملكة' },
];

const partners = [
  'شركة الدار للتطوير',
  'مجموعة الأمواج العقارية',
  'شركة إتقان للتطوير',
  'مجموعة المسار العقاري',
  'شركة البنيان للإنشاء',
  'أبراج الخليج للتطوير',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="gradient-hero py-20 pattern-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-white text-sm font-semibold">مرخص من هيئة العقار السعودية</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                لقمان — خبرة
                <span className="text-gradient-gold"> 15 عامًا</span>
                <br />في خدمتك
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                وسيط عقاري مرخص رسميًا يعمل منذ أكثر من 15 عامًا على جعل حلم امتلاك العقار حقيقة للجميع.
              </p>
              <div className="flex gap-4">
                <Link to="/contact" className="btn-gold px-6 py-3 rounded-xl font-bold text-sm">
                  تواصل معنا
                </Link>
                <Link to="/properties" className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                  تصفح العقارات
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-sm text-center">
                  <div className="text-3xl font-extrabold text-gold mb-1">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40V20C360 0 720 40 1080 20 1260 10 1380 16 1440 20V40H0z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionHeader
              eyebrow="من نحن"
              title="من نحن"
              description="لقمان وسيط عقاري مرخص رسميًا من هيئة العقار السعودية. نعمل منذ أكثر من 15 عامًا على جعل حلم امتلاك العقار حقيقة يلمسها الجميع، سواء كنت تبحث عن بيت لأسرتك أو فرصة تضاعف فيها مدخراتك."
              align="right"
            />
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                رحلتنا بدأت بقناعة بسيطة: العميل يستحق وسيطًا يفهم احتياجه ويكون صادقًا معه. هذه القناعة بنت اسمنا ومبيعاتنا الموثقة التي تجاوزت 100 مليون ريال مع أكثر من مطور عقاري معتمد.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, text: 'تغطية 6 مدن رئيسية' },
                  { icon: Shield, text: 'مرخص رسميًا' },
                  { icon: Award, text: 'شراكات حصرية' },
                  { icon: CheckCircle, text: '100M+ ريال مبيعات' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 bg-cream rounded-xl p-3 border border-[var(--color-border)]">
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-primary-dark">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="btn-primary px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 mt-4"
              >
                تواصل معنا
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="رحلتنا"
            title="مسيرة نفخر بها"
          />
          <div className="mt-12 relative">
            {/* Vertical line */}
            <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-gold opacity-30 hidden sm:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-6 sm:gap-10"
                >
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-lg">
                      {item.year}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 flex-1 border border-[var(--color-border)] shadow-sm">
                    <h3 className="font-bold text-primary-dark text-base mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="قيمنا"
            title="قيمنا التي نبني عليها"
            description="هذه المبادئ هي التي تفرّقنا وتجعل عملاءنا يعودون ويوصون بنا لأحبابهم."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-cream rounded-2xl p-6 border border-[var(--color-border)] card-hover text-center"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${v.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-primary-dark text-base mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 gradient-primary pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="شركاؤنا"
            title="شركاؤنا من كبار المطورين العقاريين"
            description="نفخر بشراكاتنا مع نخبة من المطورين العقاريين المعتمدين في المملكة، ما يتيح لعملائنا الوصول لأفضل المشاريع بأسعار تنافسية وشروط مريحة."
            light
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {partners.map((partner, i) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 transition-colors"
              >
                <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <p className="text-white text-xs font-semibold leading-tight">{partner}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/projects" className="btn-gold px-7 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2">
              اكتشف مشاريعنا
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
