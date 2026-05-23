import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'right' | 'left';
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : align === 'right' ? 'text-right items-start' : 'text-left items-end';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-3 ${alignClass}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5">
          <div className="w-1.5 h-1.5 bg-gold rounded-full" />
          <span className="text-gold text-xs font-bold tracking-wide">{eyebrow}</span>
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-extrabold leading-tight ${
          light ? 'text-white' : 'text-primary-dark'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base leading-relaxed max-w-2xl ${
            light ? 'text-white/80' : 'text-gray-600'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
