'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';
import { submitContact, type ContactTarget } from '../lib/contact-service';

interface ContactFormProps {
  propertyTitle?: string;
  compact?: boolean;
  target?: ContactTarget;
}

export default function ContactForm({ propertyTitle, compact = false, target = { type: 'general' } }: ContactFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: propertyTitle ? `أرغب في الاستفسار عن: ${propertyTitle}` : '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'phone' | 'email' | 'message', string>>>({});

  const normalizeSaudiPhone = (input: string): string | null => {
    const compact = input.trim().replace(/[^\d+]/g, '');

    if (!/^\+?\d+$/.test(compact)) return null;

    const digitsOnly = compact.replace(/\+/g, '');
    if (/^05\d{8}$/.test(digitsOnly)) return `966${digitsOnly.slice(1)}`;
    if (/^9665\d{8}$/.test(digitsOnly)) return digitsOnly;
    if (/^5\d{8}$/.test(digitsOnly)) return `966${digitsOnly}`;

    return null;
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<'name' | 'phone' | 'email' | 'message', string>> = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'الاسم مطلوب ويجب أن يكون حرفين على الأقل.';
    }

    if (!normalizeSaudiPhone(form.phone)) {
      nextErrors.phone = 'رقم الجوال السعودي غير صحيح. مثال: 05XXXXXXXX أو +9665XXXXXXXX.';
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'البريد الإلكتروني غير صالح.';
    }

    if (!form.message.trim()) {
      nextErrors.message = 'الرسالة مطلوبة.';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    setFieldErrors({});
    const contextPrefix =
      target.type === 'property'
        ? `استفسار عن عقار: ${propertyTitle || 'غير محدد'}`
        : target.type === 'project'
        ? `استفسار عن مشروع: ${propertyTitle || 'غير محدد'}`
        : '';

    const composedMessage = contextPrefix
      ? `${contextPrefix}\n${form.message.trim() || ''}`.trim()
      : form.message.trim() || (propertyTitle ? `استفسار عن: ${propertyTitle}` : 'استفسار عام');

    const normalizedPhone = normalizeSaudiPhone(form.phone);
    if (!normalizedPhone) {
      setLoading(false);
      setFieldErrors({ phone: 'رقم الجوال السعودي غير صحيح.' });
      return;
    }

    const result = await submitContact(
      {
        name: form.name.trim(),
        phone: normalizedPhone,
        email: form.email.trim() || undefined,
        message: composedMessage,
      },
      target
    );
    setLoading(false);
    if (result.ok) {
      setSubmitted(true);
      return;
    }
    if (result.fieldErrors) setFieldErrors(result.fieldErrors);
    setError(result.message || 'تعذر إرسال الرسالة حاليًا.');
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
              {fieldErrors.name ? <p className="text-red-600 text-xs font-semibold mt-1.5">{fieldErrors.name}</p> : null}
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
              {fieldErrors.phone ? <p className="text-red-600 text-xs font-semibold mt-1.5">{fieldErrors.phone}</p> : null}
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
              {fieldErrors.email ? <p className="text-red-600 text-xs font-semibold mt-1.5">{fieldErrors.email}</p> : null}
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
            {fieldErrors.message ? <p className="text-red-600 text-xs font-semibold mt-1.5">{fieldErrors.message}</p> : null}
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

          {error ? (
            <p className="text-red-600 text-xs font-semibold text-center">{error}</p>
          ) : null}

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
