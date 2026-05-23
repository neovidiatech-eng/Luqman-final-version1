import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Award, CreditCard, MapPin, Star, ArrowLeft,
  CheckCircle, Users, TrendingUp, Home, Store
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AnimatedCounter from '../components/AnimatedCounter';
import PropertyCard from '../components/PropertyCard';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import FAQAccordion from '../components/FAQAccordion';
import { sampleProperties, sampleProjects, blogPosts } from '../data/properties';

// Hero illustration
const HeroIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Background glow */}
    <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent rounded-full scale-150" />

    {/* Main house SVG */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10"
    >
      <svg viewBox="0 0 300 220" fill="none" className="w-72 h-56 sm:w-96 sm:h-72">
        {/* Ground */}
        <rect x="20" y="195" width="260" height="8" rx="4" fill="white" fillOpacity="0.15"/>

        {/* Main house */}
        <path d="M150 30L60 100v100h60V150h60v50h60V100L150 30z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
        <path d="M110 200v-50h80v50" fill="white" fillOpacity="0.2"/>

        {/* Roof detail */}
        <path d="M150 30L60 100" stroke="white" strokeWidth="2.5" strokeOpacity="0.6"/>
        <path d="M150 30L240 100" stroke="white" strokeWidth="2.5" strokeOpacity="0.6"/>

        {/* Door */}
        <rect x="135" y="155" width="30" height="45" rx="15" fill="white" fillOpacity="0.3"/>
        <circle cx="160" cy="178" r="2.5" fill="#C19F42"/>

        {/* Windows */}
        <rect x="75" y="115" width="30" height="25" rx="4" fill="white" fillOpacity="0.3"/>
        <rect x="195" y="115" width="30" height="25" rx="4" fill="white" fillOpacity="0.3"/>

        {/* Palm tree right */}
        <line x1="255" y1="195" x2="255" y2="130" stroke="white" strokeWidth="3" strokeOpacity="0.5"/>
        <ellipse cx="255" cy="120" rx="20" ry="8" fill="#C19F42" fillOpacity="0.6" transform="rotate(-20, 255, 120)"/>
        <ellipse cx="255" cy="122" rx="20" ry="8" fill="#C19F42" fillOpacity="0.5" transform="rotate(20, 255, 122)"/>
        <ellipse cx="255" cy="118" rx="18" ry="7" fill="#C19F42" fillOpacity="0.4" transform="rotate(60, 255, 118)"/>

        {/* Palm tree left */}
        <line x1="45" y1="195" x2="45" y2="140" stroke="white" strokeWidth="2.5" strokeOpacity="0.4"/>
        <ellipse cx="45" cy="132" rx="16" ry="6" fill="#C19F42" fillOpacity="0.5" transform="rotate(-15, 45, 132)"/>
        <ellipse cx="45" cy="134" rx="16" ry="6" fill="#C19F42" fillOpacity="0.4" transform="rotate(25, 45, 134)"/>

        {/* Stars/sparkles */}
        <circle cx="240" cy="50" r="2" fill="#C19F42"/>
        <circle cx="60" cy="60" r="1.5" fill="white" fillOpacity="0.6"/>
        <circle cx="270" cy="80" r="1.5" fill="white" fillOpacity="0.5"/>

        {/* Gold circle accent */}
        <circle cx="230" cy="45" r="20" stroke="#C19F42" strokeWidth="1.5" strokeOpacity="0.4" fill="none"/>
        <circle cx="230" cy="45" r="15" stroke="#C19F42" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
      </svg>
    </motion.div>

    {/* Floating cards */}
    <motion.div
      animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute top-4 right-0 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white text-xs font-bold shadow-lg"
    >
      <div className="flex items-center gap-2">
        <Home className="w-4 h-4 text-gold" />
        عقارك بدون ما تحتار
      </div>
    </motion.div>

    <motion.div
      animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className="absolute bottom-12 right-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white text-xs font-bold shadow-lg"
    >
      <div className="flex items-center gap-2">
        <CreditCard className="w-4 h-4 text-gold" />
        تقسيط مريح من الدار
      </div>
    </motion.div>

    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      className="absolute top-1/3 left-0 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white text-xs font-bold shadow-lg"
    >
      <div className="flex items-center gap-2">
        <Store className="w-4 h-4 text-gold" />
        مساحتك الإدارية
      </div>
    </motion.div>
  </div>
);

const features = [
  {
    icon: Users,
    title: 'خيارات تناسب احتياجك',
    description: 'نساعدك في اختيار العقار المناسب حسب ميزانيتك وأهدافك، سواء كان للسكن أو الاستثمار.',
  },
  {
    icon: MapPin,
    title: 'مواقع مختارة بعناية',
    description: 'نغطي أفضل المدن داخل المملكة مثل الطائف والرياض وجدة والدمام ومكة المكرمة والمدينة المنورة.',
  },
  {
    icon: CreditCard,
    title: 'حلول دفع مريحة',
    description: 'خيارات كاش أو تقسيط ميسر، مع إمكانية التمويل عبر البنوك المعتمدة حسب أهلية العميل.',
  },
  {
    icon: Award,
    title: 'خبرة عقارية موثوقة',
    description: 'أكثر من 15 عامًا في السوق العقاري السعودي ومبيعات موثقة تتجاوز 100 مليون ريال.',
  },
];

const testimonials = [
  {
    name: 'عبدالرحمن العتيبي',
    city: 'الرياض',
    rating: 5,
    quote: 'كنت أبحث عن شقة مناسبة لأسرتي بعد زواجي، وفريق لقمان ساعدني في إيجاد شقتي المثالية في حي الياسمين بأفضل سعر وبنظام تقسيط مريح جدًا. الاحترافية والصدق كانا واضحين من أول لقاء.',
  },
  {
    name: 'خالد المالكي',
    city: 'جدة',
    rating: 5,
    quote: 'استثمرت مع لقمان في محل تجاري في مشروع البوابة وكان قرارًا موفقًا. عملوا بشفافية تامة، وضحوا لي كل التفاصيل قبل التوقيع. أنصح كل مستثمر يبحث عن جدية ومصداقية.',
  },
  {
    name: 'نورة السهلي',
    city: 'الطائف',
    rating: 5,
    quote: 'استفدت من نظام التقسيط الميسر للحصول على شقتي في الطائف. لم أكن أتوقع أن الأمر بهذه السهولة. الفريق رافقني في كل خطوة من البحث حتى الاستلام. شكرًا لقمان.',
  },
];

const faqItems = [
  {
    question: 'كيف أحصل على العقار مع لقمان؟',
    answer: 'نبدأ بفهم احتياجك: هل تريد استقرارًا أسريًا أم استثمارًا؟ ثم نوضح لك الخيارات المتاحة وأنظمة الدفع المناسبة لميزانيتك، ونتابع معك خطوة بخطوة حتى تستلم عقارك وأنت مطمئن.',
  },
  {
    question: 'كيف يعمل نظام التقسيط؟',
    answer: 'نوفر لك خيارات دفع مرنة كاش أو تمويل عقاري عبر البنوك السعودية المعتمدة. في بعض حالات التمويل المدعوم، يمكنك البدء بدون مقدم وتأجيل أول دفعة لمدة 5 سنوات، بشرط الأهلية والاعتماد البنكي.',
  },
  {
    question: 'هل لقمان وسيط موثوق ومرخص؟',
    answer: 'نعم، لقمان وسيط مرخص رسميًا من هيئة العقار السعودية، بخبرة تتجاوز 15 عامًا ومبيعات موثقة تجاوزت 100 مليون ريال مع أكثر من مطور عقاري معتمد.',
  },
  {
    question: 'كم يستغرق الوقت من التواصل إلى الاستلام؟',
    answer: 'يختلف حسب نوع العقار وآلية التمويل، لكننا نحرص على توضيح الجدول الزمني الكامل من أول لقاء بدون مفاجآت.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero pattern-bg min-h-screen flex items-center relative overflow-hidden pt-20">
        {/* Decorative circles */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6"
              >
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-white text-sm font-semibold">وسيط مرخص من هيئة العقار السعودية</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4"
              >
                نوفر عليك
                <br />
                <span className="text-gradient-gold">الحيرة</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/85 text-xl leading-relaxed mb-3"
              >
                امتلك عقارك بسهولة مع وسيط عقاري مرخص ذو خبرة تتجاوز 15 عامًا داخل المملكة.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/70 text-base leading-relaxed mb-8"
              >
                في لقمان نساعدك تختار العقار المناسب لميزانيتك وهدفك، سواء كنت تبحث عن بيت لعائلتك أو فرصة استثمارية واعدة.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-7 py-4 rounded-2xl font-bold text-base shadow-[0_8px_30px_rgba(193,159,66,0.4)]"
                >
                  عقارك بضغطة زر
                </a>
                <Link
                  to="/properties"
                  className="border-2 border-white/30 text-white px-7 py-4 rounded-2xl font-bold text-base hover:bg-white/10 transition-all duration-200"
                >
                  تصفح العقارات
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: Shield, text: 'مرخص من هيئة العقار' },
                  { icon: Award, text: 'خبرة 15 عامًا' },
                  { icon: TrendingUp, text: '100+ مليون ريال مبيعات' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                    <badge.icon className="w-4 h-4 text-gold" />
                    <span className="text-white text-xs font-semibold">{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-96 lg:h-[500px]"
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C360 0 720 60 1080 30 1260 15 1380 25 1440 30V60H0z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Why Luqman */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="لماذا لقمان؟"
            title="لماذا يختار العملاء لقمان؟"
            description="نقدم تجربة عقارية متكاملة تجمع بين الثقة والخبرة والحلول المرنة."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-cream rounded-2xl p-6 border border-[var(--color-border)] card-hover"
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(3,76,43,0.25)]">
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-primary-dark text-base mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 gradient-primary pattern-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            eyebrow="أرقامنا"
            title="أرقام تتحدث عن نفسها"
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            {[
              { end: 15, suffix: '+', label: 'عامًا من الخبرة في سوق العقارات السعودي', prefix: '' },
              { end: 100, suffix: '+', label: 'مليون ريال مبيعات موثقة مع أكثر من مطور معتمد', prefix: '' },
              { end: 299, suffix: ',000 ريال', label: 'بداية الأسعار كاش أو بالتقسيط الميسر', prefix: '' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="text-5xl font-extrabold text-white mb-1">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Everyone */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="لقمان للجميع"
            title="لأن كل شخص يستحق عقارًا مناسبًا"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              {
                icon: Home,
                title: 'سكن عائلي',
                content: 'نساعدك في اختيار شقق وفلل في مواقع حيوية بأفضل مدن المملكة، قريبة من الخدمات والمدارس، بخيارات كاش أو تقسيط، وبمساحات مريحة تحفظ خصوصيتك وتناسب أسرتك.',
                cta: 'اعرف أكثر',
                href: '/properties?type=residential',
                color: 'from-primary to-primary-light',
              },
              {
                icon: TrendingUp,
                title: 'استثمار عقاري',
                content: 'نساعدك في الوصول إلى مشاريع عقارية ذات عوائد حقيقية، تشمل محلات تجارية وأراضي بصك حر ومكاتب إدارية من خلال شراكاتنا مع كبار المطورين في المملكة.',
                cta: 'اعرف أكثر',
                href: '/properties?type=investment',
                color: 'from-gold-dark to-gold',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: i === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)] card-hover border border-[var(--color-border)]"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-extrabold text-2xl text-primary-dark mb-3">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{card.content}</p>
                <Link
                  to={card.href}
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-200"
                >
                  {card.cta}
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="gradient-hero rounded-3xl p-12 relative overflow-hidden shadow-[var(--shadow-soft)]">
                <div className="absolute inset-0 pattern-bg opacity-50" />
                <div className="relative text-center">
                  <div className="text-6xl font-extrabold text-white mb-2">15+</div>
                  <div className="text-gold text-lg font-bold mb-8">عامًا من الخبرة</div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '100M+', label: 'ريال مبيعات' },
                      { value: '299K', label: 'يبدأ من ريال' },
                      { value: '6', label: 'مدن رئيسية' },
                      { value: '100%', label: 'مرخص رسميًا' },
                    ].map((s) => (
                      <div key={s.label} className="bg-white/10 rounded-xl p-4 border border-white/15">
                        <div className="text-xl font-extrabold text-gold">{s.value}</div>
                        <div className="text-white/70 text-xs">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <div>
              <SectionHeader
                eyebrow="عن لقمان"
                title="وسيط عقاري مرخص يعمل لمصلحتك"
                description="لقمان وسيط عقاري معتمد ومرخص رسميًا من هيئة العقار السعودية، يعمل منذ أكثر من 15 عامًا على تسهيل رحلة امتلاك العقار لآلاف العملاء داخل المملكة."
                align="right"
              />

              <div className="mt-8 space-y-4">
                {[
                  { icon: Shield, title: 'مرخص رسميًا', desc: 'وسيط معتمد من هيئة العقار السعودية' },
                  { icon: Award, title: 'شراكات حصرية', desc: 'نعمل مع كبار المطورين لنوصلك لأفضل الفرص' },
                  { icon: TrendingUp, title: 'فرص بميزانية معقولة', desc: 'تبدأ الأسعار من 299,000 ريال' },
                  { icon: CheckCircle, title: 'مبيعات موثقة', desc: 'تجاوزنا 100 مليون ريال مع أكثر من مطور معتمد' },
                ].map((v) => (
                  <div key={v.title} className="flex items-start gap-3 p-4 bg-cream rounded-xl border border-[var(--color-border)]">
                    <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center shrink-0">
                      <v.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-primary-dark text-sm">{v.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link to="/about" className="btn-primary px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2">
                  اعرف أكثر عن لقمان
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Properties */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              eyebrow="جديدنا"
              title="أحدث العقارات"
              align="right"
            />
            <Link to="/properties" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProperties.slice(0, 3).map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              eyebrow="إطلاق جديد"
              title="أحدث المشاريع"
              align="right"
            />
            <Link to="/projects" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 gradient-primary pattern-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            eyebrow="آراء العملاء"
            title="ماذا قال عنا عملاؤنا؟"
            description="نفخر بثقة عملائنا، وهذه نبذة من انطباعاتهم بعد تجربة التعامل مع فريق لقمان."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/15">
                  <div className="w-10 h-10 bg-gold/30 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/60 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="الأسئلة الشائعة"
            title="إجاباتنا دائمًا واضحة"
            description="أسئلة يسألها كثيرون — نجاوبك بصدق وشفافية."
          />
          <div className="mt-12">
            <FAQAccordion items={faqItems} />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2"
            >
              لمزيد من الأسئلة تواصل معنا عبر واتساب
            </a>
          </motion.div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              eyebrow="المدونة"
              title="أحدث المقالات"
              align="right"
            />
            <Link to="/blog" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              كل المقالات <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((p, i) => (
              <BlogCard key={p.id} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-3xl p-12 shadow-[var(--shadow-soft)] relative overflow-hidden"
          >
            <div className="absolute inset-0 pattern-bg opacity-30" />
            <div className="relative">
              <h2 className="text-3xl font-extrabold text-white mb-4">
                ابدأ رحلتك العقارية اليوم
              </h2>
              <p className="text-white/80 text-base mb-8 leading-relaxed">
                تواصل مع فريق لقمان الآن وسنساعدك في إيجاد العقار المناسب لك
              </p>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-8 py-4 rounded-2xl font-bold text-base inline-block"
              >
                عقارك بضغطة زر
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
