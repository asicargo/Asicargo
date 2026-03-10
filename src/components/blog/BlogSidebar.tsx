"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useRef } from "react";

interface AcfBlogImage {
    url: string;
    alt?: string;
    sizes?: { thumbnail?: string; medium?: string };
}

interface BlogPost {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    acf: {
        blog_image: AcfBlogImage | false;
        blog_title: string;
        blog_short_description: string;
        blog_date: string;
    };
}

interface BlogSidebarProps {
    posts: BlogPost[];
}

function formatShortDate(dateStr: string): string {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length === 3) {
        return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function BlogSidebar({ posts }: BlogSidebarProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    if (!posts || posts.length === 0) return null;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="sticky top-28 space-y-6"
        >
            {/* Popular Posts */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                <h3 className="text-lg font-bold text-zinc-900 mb-5 flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-500 rounded-full inline-block" />
                    Other Posts
                </h3>
                <div className="flex flex-col gap-4">
                    {posts.map((post, index) => {
                        const thumbUrl =
                            post.acf.blog_image && typeof post.acf.blog_image === "object"
                                ? post.acf.blog_image.sizes?.thumbnail || post.acf.blog_image.url
                                : null;
                        const title = post.acf.blog_title || post.title.rendered;
                        const dateStr = post.acf.blog_date || post.date;
                        const dateFormatted = formatShortDate(dateStr);

                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.07, duration: 0.4 }}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="flex items-start gap-3 group"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative w-16 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-200">
                                        {thumbUrl ? (
                                            <Image
                                                src={thumbUrl}
                                                alt={title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-400"
                                                sizes="64px"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300" />
                                        )}
                                    </div>
                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className="text-sm font-semibold text-zinc-800 group-hover:text-orange-500 transition-colors leading-snug line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: title }}
                                        />
                                        {dateFormatted && (
                                            <span className="inline-flex items-center gap-1 text-xs text-zinc-400 mt-1">
                                                <Calendar className="w-3 h-3 text-orange-400" />
                                                {dateFormatted}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                                {index < posts.length - 1 && (
                                    <div className="border-b border-zinc-200 mt-4" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-200">
                <h4 className="text-lg font-bold mb-2">Ready to Ship?</h4>
                <p className="text-orange-100 text-sm leading-relaxed mb-5">
                    Get your cargo from Dubai to Sri Lanka with ease. Fast, reliable, and door-to-door.
                </p>
                <Link
                    href="/"
                    className="inline-block px-5 py-2.5 bg-white text-orange-600 font-semibold text-sm rounded-xl hover:bg-orange-50 transition-colors shadow-sm"
                >
                    Get a Quote
                </Link>
            </div>
        </motion.div>
    );
}
