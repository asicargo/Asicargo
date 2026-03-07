"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
    data: any; // Using any for simplicity here, or define a specific interface based on WP data
}

export default function Hero({ data: heroData }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.2 }
            )
                .fromTo(
                    descRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(
                    buttonsRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    "-=0.4"
                )
                .fromTo(
                    featuresRef.current?.children ? Array.from(featuresRef.current.children) : [],
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
                    "-=0.2"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen min-h-[800px] flex items-center pt-20 overflow-hidden bg-black"
        >
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full scale-105 opacity-90"
                    src={heroData.hero_section_background_video.url}
                />
                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            {/* Spotlight Effect (CSS representation) */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center h-full pb-32">
                <div className="max-w-3xl">
                    {/* Tag */}
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-md border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm text-orange-400 text-sm font-semibold uppercase tracking-wider">
                        Premium Logistics Partner
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
                        dangerouslySetInnerHTML={{
                            __html: heroData.hero_main_title
                                .replace("Stress Free Door to Door Cargo", 'Stress Free <span class="text-orange-500 block">Door to Door Cargo</span>')
                        }}
                    />

                    {/* Description */}
                    <p
                        ref={descRef}
                        className="text-lg md:text-xl text-zinc-300 mb-10 max-w-xl leading-relaxed"
                    >
                        {heroData.hero_section_description}
                    </p>

                    {/* CTA Buttons */}
                    <div ref={buttonsRef} className="flex flex-wrap items-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href={heroData.book_a_shipment_url}
                                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-semibold shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
                            >
                                {heroData.book_a_shipment}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href={heroData.services_button_url}
                                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/10 transition-colors"
                            >
                                {heroData.services_button}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Features Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                <div
                    ref={featuresRef}
                    className="max-w-7xl mx-auto px-6 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-white/10"
                >
                    {[heroData.word_1, heroData.word_2, heroData.word_3, heroData.word_4].map(
                        (word, index) => (
                            <div
                                key={index}
                                className="pl-6 md:pl-8 first:pl-0 first:border-0"
                                dangerouslySetInnerHTML={{
                                    __html: word
                                        .replace(/<p><strong/g, '<p class="text-xs md:text-sm font-bold text-orange-500 uppercase tracking-wider mb-1"><strong')
                                        .replace(/<\/strong><\/p>\n<p>/g, '</strong></p><p class="text-xs md:text-sm text-zinc-400">'),
                                }}
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
