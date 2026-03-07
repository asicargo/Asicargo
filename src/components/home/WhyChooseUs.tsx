"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

interface WhyChooseUsProps {
    data: any;
}

export default function WhyChooseUs({ data: chooseUsData }: WhyChooseUsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="w-full bg-[#0A0F1A] text-white">
            {/* Top Video Hero Area */}
            <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-105 brightness-90 contrast-125 saturate-110"
                    src={chooseUsData.choose_us_video?.url || chooseUsData.why_choose_us_video?.url}
                />
                {/* Gradient Overlay to blend into the dark background below */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/50 to-transparent" />
            </div>

            {/* Main Content Area */}
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 -mt-20 md:-mt-32 pb-24 sm:pb-32 z-10">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainerVariants}
                >
                    {/* Header Content */}
                    <motion.div variants={fadeUpVariants} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                        <h3 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4">
                            {chooseUsData.choose_us_main_title}
                        </h3>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
                            {chooseUsData.choose_us_sub_topic}
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            {chooseUsData.choose_us_description}
                        </p>
                    </motion.div>

                    {/* Features 2x2 Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-24">
                        {chooseUsData.choose_us_points.map((point: any, index: number) => (
                            <motion.div
                                key={index}
                                variants={fadeUpVariants}
                                className="flex flex-col sm:flex-row gap-6"
                            >
                                {/* Icon Container - Orange Box */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                        <img
                                            src={point.choose_us_point_icon.url}
                                            alt={point.choose_us_point_title}
                                            className="w-6 h-6 brightness-0 invert" // Make SVG white
                                        />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div>
                                    <h4 className="text-xl font-bold mb-3">
                                        {point.choose_us_point_title}
                                    </h4>
                                    <p className="text-slate-400 leading-relaxed text-[15px]">
                                        {point.choose_us_point_description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
