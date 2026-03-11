"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TrackingHeroProps {
    data: any;
}

export default function TrackingHero({ data }: TrackingHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative w-full flex items-center justify-center h-[70vh] min-h-[580px] overflow-hidden bg-zinc-900"
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 w-full h-full z-0"
            >
                {data.tracking_hero_background?.url && (
                    <Image
                        src={data.tracking_hero_background.url}
                        alt={data.tracking_hero_background.alt || "Tracking background"}
                        fill
                        className="object-cover w-full h-full opacity-60"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/50 to-zinc-900" />
            </motion.div>

            {/* Spotlight Effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/20 blur-[100px] rounded-full pointer-events-none z-0 mix-blend-screen" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-block px-4 py-1.5 mb-6 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm text-orange-400 text-sm font-semibold uppercase tracking-wider"
                >
                    Live Cargo Tracking
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
                >
                    {data.tracking_page}
                </motion.h1>

                {data.tracking_sub_title && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        {data.tracking_sub_title}
                    </motion.p>
                )}

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                    className="h-1 w-24 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto mt-10 rounded-full"
                />
            </div>

            {/* Bottom fading edge */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent z-20 pointer-events-none" />
        </section>
    );
}
