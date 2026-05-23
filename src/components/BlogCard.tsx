'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image?: string;
  };
  index?: number;
}

const BlogIllustration = ({ category }: { category: string }) => {
  const colors: Record<string, string> = {
    'شراء العقار': 'from-emerald-600 to-primary',
    'التمويل والتقسيط': 'from-gold-dark to-gold',
    'الاستثمار العقاري': 'from-blue-600 to-primary-light',
    'نصائح قانونية': 'from-primary to-primary-light',
    'أخبار السوق السعودي': 'from-amber-600 to-gold',
  };
  const gradient = colors[category] || 'from-primary to-primary-light';

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10 pattern-bg" />
      <svg viewBox="0 0 80 60" fill="none" className="w-16 h-12 opacity-40">
        <rect x="10" y="10" width="60" height="40" rx="6" fill="white"/>
        <rect x="18" y="20" width="30" height="3" rx="1.5" fill="white" fillOpacity="0.5"/>
        <rect x="18" y="27" width="44" height="3" rx="1.5" fill="white" fillOpacity="0.5"/>
        <rect x="18" y="34" width="36" height="3" rx="1.5" fill="white" fillOpacity="0.5"/>
      </svg>
    </div>
  );
};

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(3,76,43,0.08)] hover:shadow-[0_20px_60px_rgba(3,76,43,0.14)] transition-shadow duration-300 group flex flex-col"
    >
      <Link href={`/blog/${post.slug}`} className="h-44 overflow-hidden block relative bg-gray-100">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const sib = e.currentTarget.nextElementSibling;
              if (sib) sib.removeAttribute('style');
            }}
          />
        ) : null}
        <div style={post.image ? { display: 'none' } : undefined} className="w-full h-full">
          <BlogIllustration category={post.category} />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-bold text-base text-primary-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug flex-1">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary font-semibold text-xs flex items-center gap-1 hover:gap-2 transition-all duration-200"
          >
            اقرأ المقالة
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
