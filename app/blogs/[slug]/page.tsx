import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { blogs, type BlogBlock } from '@/lib/blogs';

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return { title: 'Blog Not Found' };
  return {
    title: `${blog.title} - EastOfKailash.com`,
    description: blog.excerpt,
  };
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === 'h2') {
    return (
      <h2 className="text-xl sm:text-2xl font-bold text-primary-navy tracking-tight mt-10 sm:mt-12 mb-4">
        {block.text}
      </h2>
    );
  }
  if (block.type === 'list') {
    return (
      <ul className="space-y-3 my-6">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-secondary-text leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent shrink-0 mt-2" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="my-8 sm:my-10 border-l-4 border-gold-accent bg-light-navy/50 px-5 sm:px-7 py-5 sm:py-6">
        <p className="text-base sm:text-lg font-semibold text-primary-navy leading-relaxed italic">
          &ldquo;{block.text}&rdquo;
        </p>
      </blockquote>
    );
  }
  return (
    <p className="text-sm sm:text-[15px] text-secondary-text leading-[1.9] text-justify mb-5">
      {block.text}
    </p>
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  const idx = blogs.findIndex((b) => b.slug === slug);
  const prev = idx > 0 ? blogs[idx - 1] : null;
  const next = idx < blogs.length - 1 ? blogs[idx + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-navy text-white pt-10 sm:pt-14 pb-10 sm:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-6 sm:mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All Insights
          </Link>
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 block">
            {blog.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15] mb-4 sm:mb-5">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-light-navy/60 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {blog.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-0">
        <div className="relative aspect-[16/8] overflow-hidden border border-border-color">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Content */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-base sm:text-lg text-primary-navy font-semibold leading-relaxed mb-6 pb-6 border-b border-border-color">
            {blog.excerpt}
          </p>
          {blog.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {/* CTA */}
          <div className="mt-10 sm:mt-12 bg-primary-navy text-white p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              Buying or selling in East of Kailash?
            </h3>
            <p className="text-light-navy/60 text-sm mb-5 leading-relaxed">
              Get hyperlocal advice on pricing, paperwork and negotiation — free, no obligation.
            </p>
            <Link
              href="/exclusive-deals"
              className="inline-flex items-center justify-center gap-2 bg-gold-accent text-primary-navy hover:bg-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Talk to an Expert
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="bg-light-navy/30 border-t border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blogs/${prev.slug}`}
                className="group flex items-center gap-4 py-8 border-b sm:border-b-0 sm:border-r border-border-color hover:bg-white transition-colors px-2 sm:px-6"
              >
                <ArrowLeft className="w-5 h-5 text-secondary-text group-hover:text-gold-accent transition-colors shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-text block mb-1">
                    Previous Article
                  </span>
                  <span className="text-sm sm:text-base font-bold text-primary-navy group-hover:text-gold-accent transition-colors block truncate">
                    {prev.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="py-8 px-2 sm:px-6" />
            )}
            {next ? (
              <Link
                href={`/blogs/${next.slug}`}
                className="group flex items-center justify-end gap-4 py-8 hover:bg-white transition-colors px-2 sm:px-6 text-right"
              >
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-text block mb-1">
                    Next Article
                  </span>
                  <span className="text-sm sm:text-base font-bold text-primary-navy group-hover:text-gold-accent transition-colors block truncate">
                    {next.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-secondary-text group-hover:text-gold-accent transition-colors shrink-0" />
              </Link>
            ) : (
              <div className="py-8 px-2 sm:px-6" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
