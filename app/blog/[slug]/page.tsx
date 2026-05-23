import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowRight } from 'lucide-react';
import { getBlogPostBySlug } from '../../../src/lib/content-service';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'المقال غير موجود' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-cream border-b border-[var(--color-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">الرئيسية</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <Link href="/blog" className="hover:text-primary">المدونة</Link>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span className="text-primary font-semibold truncate max-w-xs">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          {post.category}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {post.date}
          </span>
          <span>{post.readTime}</span>
        </div>
        <div className="w-full h-[250px] sm:h-[420px] rounded-3xl overflow-hidden border border-gold/10 shadow-lg mb-8 bg-cream">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="bg-cream border border-[var(--color-border)] rounded-2xl p-6">
          <p className="text-gray-700 leading-relaxed text-base">{post.excerpt}</p>
        </div>
      </article>
    </div>
  );
}
