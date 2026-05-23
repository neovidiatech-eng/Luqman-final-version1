import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-right hover:bg-cream transition-colors"
          >
            <span className="font-bold text-primary-dark text-base pr-2">{item.question}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              openIndex === index ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
            }`}>
              {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
