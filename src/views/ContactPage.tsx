'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Twitter, Youtube } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';

const contactItems = [
  {
    icon: MessageCircle,
    label: 'واتساب',
    value: '966500000000+',
    href: 'https://wa.me/966500000000',
    color: 'bg-[#25D366]',
  },
  {
    icon: Phone,
    label: 'هاتف',
    value: '966500000000+',
    href: 'tel:+966500000000',
    color: 'gradient-primary',
  },
  {
    icon: Mail,
    label: 'البريد الإلكتروني',
    value: 'info@luqman.sa',
    href: 'mailto:info@luqman.sa',
    color: 'bg-gold',
  },
  {
    icon: Clock,
    label: 'أوقات العمل',
    value: 'الأحد — الخميس، 9ص — 6م',
    href: null,
    color: 'bg-primary-light',
  },
  {
    icon: MapPin,
    label: 'العنوان',
    value: 'الرياض، المملكة العربية السعودية',
    href: null,
    color: 'bg-primary',
  },
];

const socials = [
  { icon: Instagram, label: 'إنستغرام', href: '#' },
  { icon: Twitter, label: 'تويتر / X', href: '#' },
  { icon: Youtube, label: 'يوتيوب', href: '#' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="gradient-hero py-16 pattern-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              نتشرف بتواصلك معنا
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              سواء كان عندك سؤال، أو تريد معرفة خياراتك، أو مستعد لتبدأ رحلة امتلاك عقارك — فريقنا جاهز لك.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40V20C360 0 720 40 1080 20 1260 10 1380 16 1440 20V40H0z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 border border-[var(--color-border)] shadow-[var(--shadow-soft)]"
            >
              <SectionHeader
                eyebrow="راسلنا"
                title="أرسل استفسارك"
                align="right"
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <SectionHeader
                eyebrow="تواصل مباشر"
                title="بكل الطرق"
                align="right"
              />

              <div className="space-y-4 mt-8">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-cream rounded-2xl border border-[var(--color-border)] hover:shadow-[var(--shadow-soft)] transition-all card-hover group"
                      >
                        <div className={`w-12 h-12 ${item.color.includes('gradient') ? 'gradient-primary' : item.color} rounded-xl flex items-center justify-center shadow-sm shrink-0`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                          <p className="font-bold text-primary-dark group-hover:text-primary transition-colors">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 bg-cream rounded-2xl border border-[var(--color-border)]">
                        <div className={`w-12 h-12 ${item.color.includes('gradient') ? 'gradient-primary' : item.color} rounded-xl flex items-center justify-center shadow-sm shrink-0`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                          <p className="font-bold text-primary-dark">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              <div className="bg-cream rounded-2xl p-6 border border-[var(--color-border)]">
                <p className="font-bold text-primary-dark text-sm mb-4">تابعنا على وسائل التواصل</p>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center hover:shadow-lg transition-all hover:-translate-y-0.5"
                      aria-label={s.label}
                    >
                      <s.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-cream rounded-2xl overflow-hidden border border-[var(--color-border)] h-48 relative">
                <div className="absolute inset-0 gradient-primary opacity-90 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-10 h-10 mx-auto mb-2 text-gold" />
                    <p className="font-bold">الرياض، المملكة العربية السعودية</p>
                    <p className="text-white/70 text-sm mt-1">نغطي أبرز مدن المملكة</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all text-base"
              >
                <MessageCircle className="w-5 h-5" />
                عقارك بضغطة زر — تواصل عبر واتساب
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
