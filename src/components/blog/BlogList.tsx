"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface AcfBlogImage {
    url: string;
    alt?: string;
    sizes?: {
        large?: string;
        medium_large?: string;
    };
}

interface BlogPost {
    id: number;
    date: string;
    slug: string;
    title: {
        rendered: string;
    };
    acf: {
        blog_image: AcfBlogImage | false;
        blog_title: string;
        blog_short_description: string;
        blog_more_description: string;
        blog_date: string;
    };
}

interface BlogListProps {
    posts: BlogPost[];
}

function formatDate(dateStr: string) {
    if (!dateStr) return null;
    // Try dd/mm/yyyy format first
    const parts = dateStr.split("/");
    if (parts.length === 3) {
        return {
            day: parts[0],
            month: new Date(`${parts[1]}/01/2000`).toLocaleString("en-US", { month: "short" }),
            full: new Date(`${parts[1]}/${parts[0]}/${parts[2]}`).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        };
    }
    // Fallback: ISO date
    const d = new Date(dateStr);
    return {
        day: String(d.getDate()).padStart(2, "0"),
        month: d.toLocaleString("en-US", { month: "short" }),
        full: d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const imageUrl =
        post.acf.blog_image && typeof post.acf.blog_image === "object"
            ? post.acf.blog_image.sizes?.large || post.acf.blog_image.url
            : null;

    const dateInfo = formatDate(post.acf.blog_date || post.date);
    const title = post.acf.blog_title || post.title.rendered;
    const description = post.acf.blog_short_description;

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-zinc-100"
        >
            {/* Image */}
            <Link href={`/blog/${post.slug}`} className="block relative h-56 w-full overflow-hidden shrink-0">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
                        <span className="text-zinc-400 text-sm">No Image</span>
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Date Badge */}
                {dateInfo && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-center rounded-lg px-3 py-2 shadow-lg z-10">
                        <div className="text-xl font-extrabold leading-none">{dateInfo.day}</div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider">{dateInfo.month}</div>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex-1 flex flex-col p-6">
                <h2 className="text-lg font-bold text-zinc-900 mb-3 line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`} dangerouslySetInnerHTML={{ __html: title }} />
                </h2>

                {description && (
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
                        {description}
                    </p>
                )}

                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm group/link mt-auto"
                >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-orange-500 to-orange-400 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
        </motion.article>
    );
}

export default function BlogList({ posts }: BlogListProps) {
    if (!posts || posts.length === 0) {
        return (
            <div className="py-24 text-center">
                <p className="text-zinc-400 text-lg">No posts found.</p>
            </div>
        );
    }

    return (
        <section className="py-20 bg-zinc-50">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-sm font-semibold uppercase tracking-wide">
                        Latest Articles
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
                        News & <span className="text-orange-500">Insights</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
