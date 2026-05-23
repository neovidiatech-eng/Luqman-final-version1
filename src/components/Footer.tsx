import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-6 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-gold/30 flex items-center justify-center bg-white shadow-md">
                <img src="/logo.jpeg" alt="شعار لقمان للتسويق العقاري" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-base text-white">لقمان</p>
                <p className="text-xs text-gold-light">للتسويق العقاري</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              وسيط عقاري مرخص من هيئة العقار السعودية، نساعد الأفراد والمستثمرين على امتلاك العقارات المناسبة داخل المملكة.
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-gold/20 border border-gold/30 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-gold text-xs font-semibold">مرخص من هيئة العقار</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base text-gold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { label: 'الرئيسية', href: '/' },
                { label: 'العقارات', href: '/properties' },
                { label: 'المشاريع', href: '/projects' },
                { label: 'من نحن', href: '/about' },
                { label: 'المدونة', href: '/blog' },
                { label: 'تواصل معنا', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-gold/50">←</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-bold text-base text-gold mb-4">أنواع العقارات</h3>
            <ul className="space-y-2">
              {[
                { label: 'شقق سكنية', href: '/properties?type=شقق سكنية' },
                { label: 'فلل', href: '/properties?type=فلل' },
                { label: 'أراضي', href: '/properties?type=أراضي' },
                { label: 'عقارات تجارية', href: '/properties?type=عقارات تجارية' },
                { label: 'مجمعات سكنية', href: '/projects' },
                { label: 'مشاريع قيد الإنشاء', href: '/projects?status=قيد الإنشاء' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-gold/50">←</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base text-gold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a href="https://wa.me/966500000000" className="text-white/70 hover:text-gold text-sm transition-colors">
                  واتساب: 966500000000+
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a href="mailto:info@luqman.sa" className="text-white/70 hover:text-gold text-sm transition-colors">
                  info@luqman.sa
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm">الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm">الأحد — الخميس، 9ص — 6م</span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-gold/30 rounded-lg flex items-center justify-center transition-colors"
                aria-label="إنستغرام"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-gold/30 rounded-lg flex items-center justify-center transition-colors"
                aria-label="تويتر"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-gold/30 rounded-lg flex items-center justify-center transition-colors"
                aria-label="يوتيوب"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
          <p className="text-white/50 text-sm">
            © 2026 لقمان للتسويق العقاري. جميع الحقوق محفوظة.
          </p>
          <p className="text-white/40 text-sm">
            تم التصميم والتطوير بواسطة{' '}
            <a
              href="https://neovidia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              شركة Neovidia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
