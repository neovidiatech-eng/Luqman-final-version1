export interface ContentFile {
  url: string;
  name: string;
  size?: number;
  type?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: string;
  city: string;
  district: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  floor?: number;
  status: 'متاح' | 'محجوز' | 'مباع';
  isNew?: boolean;
  financeAvailable?: boolean;
  features: string[];
  images: string[];
  files?: ContentFile[];
  description: string;
  addedDate: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  units: number;
  deliveryStatus: 'قيد الإنشاء' | 'مكتمل' | 'قيد التطوير';
  type: 'مجمع سكني' | 'تجاري' | 'مشروع على الخارطة' | 'سياحي';
  startingPrice: number;
  description: string;
  features: string[];
  paymentPlan: string;
  developer: string;
  images: string[];
  files?: ContentFile[];
  availableUnits: UnitType[];
}

export interface UnitType {
  type: string;
  area: number;
  price: number;
  floor: string;
  status: 'متاح' | 'محجوز' | 'مباع';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export const sampleProperties: Property[] = [
  {
    id: '1',
    slug: 'شقة-3-غرف-حي-الياسمين-الرياض',
    title: 'شقة فاخرة 3 غرف في حي الياسمين',
    type: 'شقق سكنية',
    city: 'الرياض',
    district: 'حي الياسمين',
    price: 650000,
    area: 180,
    rooms: 3,
    bathrooms: 2,
    floor: 4,
    status: 'متاح',
    isNew: true,
    financeAvailable: true,
    features: ['مكيف مركزي', 'موقف سيارات خاص', 'مصعد', 'أمن وحراسة 24 ساعة'],
    images: [],
    description: 'شقة فاخرة في موقع متميز بحي الياسمين، تتميز بتشطيبات راقية ومواد بناء عالية الجودة.',
    addedDate: '2025-01-15',
  },
  {
    id: '2',
    slug: 'فيلا-4-غرف-حي-النزهة-جدة',
    title: 'فيلا عائلية 4 غرف في حي النزهة',
    type: 'فلل',
    city: 'جدة',
    district: 'حي النزهة',
    price: 1200000,
    area: 350,
    rooms: 4,
    bathrooms: 3,
    status: 'متاح',
    isNew: false,
    financeAvailable: true,
    features: ['مكيف مركزي', 'حديقة خاصة', 'مسبح', 'موقف سيارات خاص', 'أمن 24 ساعة'],
    images: [],
    description: 'فيلا فاخرة مع حديقة خاصة في أرقى أحياء جدة، مثالية للأسر الكبيرة.',
    addedDate: '2025-01-10',
  },
  {
    id: '3',
    slug: 'شقة-2-غرف-حي-الوزيرية-مكة',
    title: 'شقة 2 غرفة في حي الوزيرية',
    type: 'شقق سكنية',
    city: 'مكة المكرمة',
    district: 'حي الوزيرية',
    price: 299000,
    area: 110,
    rooms: 2,
    bathrooms: 1,
    floor: 2,
    status: 'متاح',
    isNew: true,
    financeAvailable: true,
    features: ['مكيف مركزي', 'مصعد', 'موقف سيارات'],
    images: [],
    description: 'شقة مميزة قريبة من المسجد الحرام، فرصة ذهبية للسكن والاستثمار.',
    addedDate: '2025-01-20',
  },
  {
    id: '4',
    slug: 'محل-تجاري-حي-السلامة-الطائف',
    title: 'محل تجاري في حي السلامة',
    type: 'عقارات تجارية',
    city: 'الطائف',
    district: 'حي السلامة',
    price: 450000,
    area: 75,
    rooms: 0,
    bathrooms: 1,
    floor: 1,
    status: 'متاح',
    isNew: false,
    financeAvailable: false,
    features: ['واجهة تجارية', 'مكيف', 'تشطيب جاهز'],
    images: [],
    description: 'محل تجاري في موقع حيوي بالطائف، مناسب لمختلف الأنشطة التجارية.',
    addedDate: '2025-01-05',
  },
  {
    id: '5',
    slug: 'أرض-سكنية-حي-الندى-المدينة',
    title: 'أرض سكنية بصك حر في حي الندى',
    type: 'أراضي',
    city: 'المدينة المنورة',
    district: 'حي الندى',
    price: 380000,
    area: 600,
    rooms: 0,
    bathrooms: 0,
    status: 'متاح',
    isNew: true,
    financeAvailable: false,
    features: ['صك حر', 'شارعين', 'مرافق جاهزة'],
    images: [],
    description: 'أرض سكنية بموقع ممتاز في المدينة المنورة مع صك حر وإمكانية البناء الفوري.',
    addedDate: '2025-01-18',
  },
  {
    id: '6',
    slug: 'شقة-3-غرف-حي-العزيزية-الدمام',
    title: 'شقة 3 غرف نوم في حي العزيزية',
    type: 'شقق سكنية',
    city: 'الدمام',
    district: 'حي العزيزية',
    price: 520000,
    area: 160,
    rooms: 3,
    bathrooms: 2,
    floor: 3,
    status: 'متاح',
    isNew: false,
    financeAvailable: true,
    features: ['مكيف مركزي', 'موقف خاص', 'مطبخ مجهز', 'مصعد'],
    images: [],
    description: 'شقة عائلية مريحة في الدمام بتشطيبات ممتازة وموقع قريب من الخدمات.',
    addedDate: '2025-01-12',
  },
];

export const sampleProjects: Project[] = [
  {
    id: '1',
    slug: 'مشروع-النخيل-الرياض',
    title: 'مشروع النخيل السكني',
    location: 'شمال الرياض',
    city: 'الرياض',
    units: 120,
    deliveryStatus: 'قيد الإنشاء',
    type: 'مجمع سكني',
    startingPrice: 550000,
    description: 'مشروع النخيل السكني هو مجمع سكني متكامل في شمال الرياض، يضم وحدات سكنية متنوعة تلبي احتياجات الأسر السعودية بتصاميم عصرية وتشطيبات فاخرة.',
    features: ['موقع استراتيجي', 'تشطيبات فاخرة', 'قرب من المدارس', 'ملاعب أطفال', 'أمن 24/7', 'مواقف سيارات مغطاة'],
    paymentPlan: '20% مقدم + 80% على 5 سنوات',
    developer: 'شركة الدار للتطوير العقاري',
    images: [],
    availableUnits: [
      { type: 'شقة 2 غرفة', area: 110, price: 550000, floor: 'الطابق الأول', status: 'متاح' },
      { type: 'شقة 3 غرف', area: 160, price: 720000, floor: 'الطابق الثاني', status: 'متاح' },
      { type: 'شقة 4 غرف', area: 210, price: 950000, floor: 'الطابق الثالث', status: 'محجوز' },
    ],
  },
  {
    id: '2',
    slug: 'مشروع-البوابة-جدة',
    title: 'مشروع البوابة التجاري',
    location: 'وسط جدة',
    city: 'جدة',
    units: 60,
    deliveryStatus: 'مكتمل',
    type: 'تجاري',
    startingPrice: 800000,
    description: 'مشروع البوابة التجاري في قلب جدة، يوفر محلات ومكاتب إدارية بمواصفات عالمية في موقع استراتيجي.',
    features: ['مدخل رئيسي فخم', 'تكييف مركزي', 'أمن وكاميرات', 'مواقف مغطاة', 'واجهات زجاجية'],
    paymentPlan: '30% مقدم + 70% على 3 سنوات',
    developer: 'مجموعة الأمواج العقارية',
    images: [],
    availableUnits: [
      { type: 'محل تجاري', area: 50, price: 800000, floor: 'الأرضي', status: 'متاح' },
      { type: 'مكتب إداري', area: 80, price: 1100000, floor: 'الأول', status: 'متاح' },
      { type: 'محل زاوية', area: 70, price: 1050000, floor: 'الأرضي', status: 'مباع' },
    ],
  },
  {
    id: '3',
    slug: 'مشروع-الواحة-الطائف',
    title: 'مشروع الواحة السكني',
    location: 'شرق الطائف',
    city: 'الطائف',
    units: 80,
    deliveryStatus: 'قيد التطوير',
    type: 'مشروع على الخارطة',
    startingPrice: 320000,
    description: 'مشروع الواحة في الطائف يقدم وحدات سكنية بأسعار مناسبة في منطقة هادئة بالطائف، مع خطط دفع ميسرة.',
    features: ['طبيعة خلابة', 'هواء نقي', 'قرب من الخدمات', 'تصاميم عصرية', 'ملاعب رياضية'],
    paymentPlan: 'بدون مقدم + أول قسط بعد سنة',
    developer: 'شركة إتقان للتطوير',
    images: [],
    availableUnits: [
      { type: 'شقة 2 غرفة', area: 95, price: 320000, floor: 'متعدد', status: 'متاح' },
      { type: 'شقة 3 غرف', area: 140, price: 450000, floor: 'متعدد', status: 'متاح' },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-buy-property-in-saudi-arabia',
    title: 'خطوات شراء عقار في السعودية لأول مرة',
    excerpt: 'دليل شامل لكل من يفكر في شراء أول عقار في المملكة — من تحديد الهدف إلى استلام المفتاح.',
    category: 'شراء العقار',
    date: '15 يناير 2025',
    readTime: '8 دقائق',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: '2',
    slug: 'common-mistakes-first-time-buyers',
    title: 'أخطاء شائعة عند شراء أول عقار',
    excerpt: 'تعرّف على أكثر الأخطاء شيوعًا عند شراء العقار في السعودية وكيف تتجنبها لتوفير آلاف الريالات.',
    category: 'نصائح قانونية',
    date: '20 يناير 2025',
    readTime: '6 دقائق',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    id: '3',
    slug: 'how-to-choose-right-property',
    title: 'كيف تختار العقار المناسب في السعودية',
    excerpt: 'معايير أساسية تساعدك على اختيار العقار المثالي حسب احتياجاتك وميزانيتك في السوق السعودي.',
    category: 'شراء العقار',
    date: '25 يناير 2025',
    readTime: '5 دقائق',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
];
