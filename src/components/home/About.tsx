"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, Variants, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function Counter({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const match = value.match(/^(\d+)(.*)$/);
    const num = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : "";

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
    });

    useEffect(() => {
        if (inView && match) {
            setTimeout(() => {
                motionValue.set(num);
            }, 300); // slight delay for better effect
        }
    }, [inView, motionValue, num, match]);

    useEffect(() => {
        if (!match) return;
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString() + suffix;
            }
        });
        return () => unsubscribe();
    }, [springValue, suffix, match]);

    if (!match) {
        return <span>{value}</span>;
    }

    return <span ref={ref}>0{suffix}</span>;
}

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

interface AboutProps {
    data: any;
}

export default function About({ data: aboutData }: AboutProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Parallax effect for the image using GSAP
    useEffect(() => {
        if (!imageContainerRef.current || !imageRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { yPercent: -10 },
                {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: imageContainerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        }, imageContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-24 sm:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Content Column */}
                    <div className="flex flex-col">
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={{
                                visible: { transition: { staggerChildren: 0.15 } }
                            }}
                        >
                            {/* Title & Subtitle */}
                            <motion.div variants={fadeUpVariants} className="mb-8">
                                <h3 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-3">
                                    {aboutData.about_title}
                                </h3>
                                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#0F172A] leading-[1.15] tracking-tight">
                                    {aboutData.about_sub_title}
                                </h2>
                            </motion.div>

                            {/* Description */}
                            <motion.p variants={fadeUpVariants} className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl">
                                {aboutData.about_description}
                            </motion.p>

                            {/* Features Grid */}
                            <motion.div variants={fadeUpVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                                {aboutData.about_points.map((point: any, index: number) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <img
                                            src={point.icon_about_point.url}
                                            alt="check"
                                            className="w-5 h-5 flex-shrink-0"
                                            style={{ filter: "invert(62%) sepia(80%) saturate(4649%) hue-rotate(345deg) brightness(101%) contrast(97%)" }}
                                        />
                                        <span className="text-[#0F172A] font-semibold text-sm sm:text-base">
                                            {point.about_point_detail}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Divider */}
                            <motion.div variants={fadeUpVariants} className="w-full h-px bg-slate-200 mb-10" />

                            {/* Statistics */}
                            <motion.div variants={fadeUpVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                {aboutData.number_points.map((stat: any, index: number) => (
                                    <div key={index} className="flex flex-col">
                                        <div className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-1">
                                            <Counter value={stat.analys_number} />
                                        </div>
                                        <div className="text-slate-500 text-sm font-medium">
                                            {stat.analys_name}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Image Column */}
                    <motion.div
                        ref={imageContainerRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img
                            ref={imageRef}
                            src={aboutData.about_us_image[0].about_us_image.url}
                            alt="Warehouse workflow"
                            className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
                        />
                        {/* Subtle inner shadow overlay for depth */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
