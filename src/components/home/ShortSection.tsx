"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

interface FeedbackProps {
    client_image: { url: string; alt?: string };
    client_name: string;
    client_dsecription: string;
    client_review: string;
}

interface ShortSectionProps {
    data: {
        short_section_title: string;
        short_section_sub_title: string;
        short_section_description: string;
        short_section_image: { url: string; alt?: string };
        get_started_now_button: string;
        get_started_now_button_link?: string;
        feedback: FeedbackProps[];
        happy_clients_: string;
    };
}

export default function ShortSection({ data }: ShortSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section ref={sectionRef} className="w-full py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 bg-slate-50 rounded-3xl shadow-2xl ring-1 ring-slate-200"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUpVariants}
                >
                    {/* Left Side: Content */}
                    <div className="relative z-20 p-10 md:p-14 lg:p-20 flex flex-col justify-center rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                        <motion.h4
                            className="text-orange-500 font-bold tracking-wider mb-4"
                            variants={fadeUpVariants}
                        >
                            {data.short_section_title}
                        </motion.h4>
                        <motion.h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 leading-[1.15]"
                            variants={fadeUpVariants}
                        >
                            {data.short_section_sub_title}
                        </motion.h2>
                        <motion.p
                            className="text-slate-500 text-lg leading-relaxed mb-10"
                            variants={fadeUpVariants}
                        >
                            {data.short_section_description}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
                            variants={fadeUpVariants}
                        >
                            <Link href={data.get_started_now_button_link || "#"}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-colors"
                                >
                                    {data.get_started_now_button}
                                </motion.button>
                            </Link>

                            {/* Client Feedback Avatars */}
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3 relative" onMouseLeave={() => setHoveredIndex(null)}>
                                    {Array.isArray(data.feedback) && data.feedback.map((fb: FeedbackProps, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`relative ${hoveredIndex === index ? 'z-50' : 'z-0'}`}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                            >
                                                {/* Avatar Circle */}
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white ring-2 ring-slate-100 shadow-sm cursor-pointer hover:z-10 transition-all duration-300 transform hover:scale-110">
                                                    <Image
                                                        src={fb.client_image?.url || "https://placehold.co/100x100"}
                                                        alt={fb.client_name || "Client"}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Desktop Individual Tooltip (Hidden on Mobile) */}
                                                <div className="hidden md:block">
                                                    <AnimatePresence>
                                                        {hoveredIndex === index && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 z-50 pointer-events-none origin-bottom"
                                                            >
                                                                {/* Tooltip Triangle Arrow */}
                                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-100 transform rotate-45" />

                                                                {/* Popup Content */}
                                                                <div className="relative z-10">
                                                                    <div className="flex items-center gap-1 mb-2">
                                                                        {Array.from({ length: parseInt(fb.client_review) || 5 }).map((_, i) => (
                                                                            <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                                        ))}
                                                                    </div>
                                                                    <p className="text-slate-600 text-sm italic mb-3 line-clamp-4">
                                                                        "{fb.client_dsecription}"
                                                                    </p>
                                                                    <p className="font-bold text-[#0F172A] text-sm">
                                                                        {fb.client_name}
                                                                    </p>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* Mobile Unified Tooltip Popup (Hidden on Desktop) */}
                                    <div className="md:hidden block">
                                        <AnimatePresence>
                                            {hoveredIndex !== null && data.feedback[hoveredIndex] && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute bottom-full left-0 mb-4 w-[85vw] max-w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 z-50 pointer-events-none origin-bottom-left"
                                                >
                                                    {/* Tooltip Triangle Arrow dynamically smoothly moving */}
                                                    <div
                                                        className="absolute -bottom-2 w-4 h-4 bg-white border-b border-r border-slate-100 transform rotate-45 transition-all duration-300 ease-in-out"
                                                        style={{
                                                            left: `${24 + (hoveredIndex * 36)}px`,
                                                            marginLeft: '-8px' // centers the 16px wide triangular arrow to the exact pixel
                                                        }}
                                                    />

                                                    {/* Popup Content */}
                                                    <div className="relative z-10 transition-opacity duration-200">
                                                        <div className="flex items-center gap-1 mb-2">
                                                            {Array.from({ length: parseInt(data.feedback[hoveredIndex].client_review) || 5 }).map((_, i) => (
                                                                <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                            ))}
                                                        </div>
                                                        <p className="text-slate-600 text-sm italic mb-3 line-clamp-4 leading-relaxed">
                                                            "{data.feedback[hoveredIndex].client_dsecription}"
                                                        </p>
                                                        <p className="font-bold text-[#0F172A] text-sm">
                                                            {data.feedback[hoveredIndex].client_name}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-[#0F172A] text-lg leading-tight">
                                        {data.happy_clients_}
                                    </span>
                                    <span className="text-sm text-slate-500 font-medium">
                                        Happy Clients
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="relative min-h-[400px] lg:min-h-full w-full overflow-hidden rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
                        {data.short_section_image?.url ? (
                            <Image
                                src={data.short_section_image.url}
                                alt={data.short_section_image.alt || "Shipping Partner"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-200" />
                        )}
                        {/* Overlay to punch up image slightly */}
                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
