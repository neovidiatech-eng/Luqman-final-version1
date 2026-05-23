import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';

interface ContactFormProps {
  propertyTitle?: string;
  compact?: boolean;
}

export default function ContactForm({ propertyTitle, compact = false }: ContactFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: propertyTitle ? `أرغب في الاستفسار عن: ${propertyTitle}` : '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 px-6"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="font-bold text-xl text-primary-dark mb-2">تم إرسال رسالتك بنجاح</h3>
          <p className="text-gray-600 text-sm mb-6">
            شكرًا لتواصلك! سيتواصل معك فريق لقمان خلال أقل من 24 ساعة.
          </p>
          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#1ebe5d] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            أو تواصل فورًا عبر واتساب
          </a>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className={compact ? '' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">الاسم *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="اسمك الكريم"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">رقم الجوال *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="رقم جوالك (XXXXXXXX05)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
              />
            </div>
          </div>

          {!compact && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="بريدك الإلكتروني — اختياري"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">الرسالة</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={compact ? 3 : 4}
              placeholder={propertyTitle ? 'أخبرنا عن استفسارك أو اختر وقت الزيارة المناسب لك...' : 'أخبرنا كيف يمكننا مساعدتك...'}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                {compact ? 'أرسل استفسارك' : 'أرسل'}
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              أو تواصل مباشرة عبر واتساب — عقارك بضغطة زر
            </a>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
