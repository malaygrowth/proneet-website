import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageByline } from "@/components/ui/page-byline";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { SITE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Long-form guides on NEET and JEE coaching in Jaipur. Written by Neeraj Gupta (Physics, 20+ years). Honest takes, no superlatives, specific numbers.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
        ]}
      />
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            BLOG
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Long-form guides, written by people who teach the exam.
          </h1>
          <PageByline
            author="ProNEET Editorial"
            authorRole="Verified by Neeraj Gupta, Founder"
            lastUpdated="April 20, 2026"
          />
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            No aggregator listicles. No unverifiable claims. Each guide
            assumes you are a serious parent or student making a real
            decision about the next two years of your preparation.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 mt-16">
          {BLOG_POSTS.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-slate-200 overflow-hidden bg-white transition-all duration-300 hover:shadow-tier-md hover:-translate-y-0.5"
              >
                <div className="grid md:grid-cols-[320px_1fr]">
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[220px]">
                    <Image
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      fill
                      sizes="(min-width: 768px) 320px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-accent-orange uppercase tracking-widest">
                        {post.category}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">{post.readingTime}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">
                        {new Date(post.publishDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        By <span className="font-semibold text-slate-600">{post.author}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                        Read the guide
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-20">
          <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 sm:p-10 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              More guides on the way
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              One new pillar guide every three weeks. In the queue:
              Hindi-medium NEET prep, the dropper year playbook,
              NEET Biology for non-Biology-background students, and a
              working guide for parents of Class 10 students planning
              the next two years. If there&apos;s a specific question
              you want answered, call the admissions line.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
