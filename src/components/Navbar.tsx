import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, LogIn, ChevronDown, Building2, ShieldCheck } from 'lucide-react';

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'العقارات', href: '/properties' },
  { label: 'المشاريع', href: '/projects' },
  { label: 'من نحن', href: '/about' },
  { label: 'المدونة', href: '/blog' },
  { label: 'تواصل معنا', href: '/contact' },
];

const loginRoles = [
  { label: 'مطور', icon: Building2, desc: 'بوابة المطورين العقاريين' },
  { label: 'أدمن', icon: ShieldCheck, desc: 'لوحة تحكم الإدارة' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();
  const loginRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';
  const isSolid = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setLoginOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isSolid ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-gold/30 flex items-center justify-center bg-white shadow-md transition-transform group-hover:scale-105 duration-300">
              <img src="/logo.jpeg" alt="شعار لقمان للتسويق العقاري" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className={`font-bold text-base leading-tight transition-colors ${isSolid ? 'text-primary' : 'text-white'}`}>
                لقمان
              </p>
              <p className={`text-xs leading-tight transition-colors ${isSolid ? 'text-gold' : 'text-gold-light'}`}>
                للتسويق العقاري
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  location.pathname === link.href
                    ? isSolid ? 'bg-primary text-white' : 'bg-white/20 text-white'
                    : isSolid
                    ? 'text-gray-700 hover:text-primary hover:bg-primary/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Login + Mobile */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 btn-gold px-4 py-2 rounded-xl text-sm font-bold"
            >
              <Phone className="w-4 h-4" />
              عقارك بضغطة زر
            </a>

            {/* Login dropdown */}
            <div className="relative hidden lg:block" ref={loginRef}>
              <button
                onClick={() => setLoginOpen((o) => !o)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
                  isSolid
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-white/60 text-white hover:bg-white/20'
                }`}
              >
                <LogIn className="w-4 h-4" />
                تسجيل الدخول
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {loginOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-52 z-50"
                  >
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 pt-1 pb-2">
                      اختر نوع الحساب
                    </p>
                    {loginRoles.map(({ label, icon: Icon, desc }) => (
                      <button
                        key={label}
                        onClick={() => setLoginOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors text-right group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 group-hover:text-primary">{label}</p>
                          <p className="text-[11px] text-gray-400 leading-tight">{desc}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isSolid ? 'text-primary hover:bg-primary/10' : 'text-white hover:bg-white/10'
              }`}
              aria-label="القائمة"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      location.pathname === link.href
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-4 py-3 rounded-xl text-sm font-bold text-center"
                >
                  عقارك بضغطة زر
                </a>
                <div className="relative">
                  <button
                    onClick={() => setLoginOpen((o) => !o)}
                    className="w-full flex items-center justify-center gap-1.5 border border-primary text-primary px-4 py-3 rounded-xl text-sm font-bold"
                  >
                    <LogIn className="w-4 h-4" />
                    تسجيل الدخول
                  </button>
                  <AnimatePresence>
                    {loginOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-14 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50"
                      >
                        {loginRoles.map(({ label, icon: Icon, desc }) => (
                          <button
                            key={label}
                            onClick={() => setLoginOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-colors text-right"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">{label}</p>
                              <p className="text-[11px] text-gray-400">{desc}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
