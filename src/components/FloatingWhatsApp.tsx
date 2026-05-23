'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/966500000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 group"
      aria-label="تواصل عبر واتساب"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        className="flex items-center gap-2"
      >
        {/* Button */}
        <div className="relative">
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 delay-300" />

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.5)]"
          >
            <MessageCircle className="w-7 h-7 text-white fill-white" />
          </motion.div>
        </div>
      </motion.div>
    </a>
  );
}
