"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

// Counter component for animated numbers
function Counter({ value, start }: { value: string; start: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);

    const match = value.match(/^(\d+)(.*)$/);
    const num = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : "";

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
    });

    useEffect(() => {
        if (start && match) {
            // Delay slightly to start counting after component is visible
            setTimeout(() => {
                motionValue.set(num);
            }, 200);
        }
    }, [start, motionValue, num, match]);

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

interface AboutExpertiseProps {
    data: {
        our_expertise: string;
        expertise: Array<{
            expertise_name: string;
            expertise_range: string;
        }>;
        number_points: Array<{
            analys_name: string;
            analys_number: string;
        }>;
    };
}

export default function AboutExpertise({ data }: AboutExpertiseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section ref={containerRef} className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Column: Progress Bars */}
                    <div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-12"
                        >
                            {data.our_expertise}
                        </motion.h2>

                        <div className="space-y-8">
                            {data.expertise.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-lg">
                                            {item.expertise_name}
                                        </span>
                                        <span className="font-medium text-zinc-400 text-sm">
                                            {item.expertise_range}%
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: `${item.expertise_range}%` } : { width: 0 }}
                                            transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                                            className="h-full bg-orange-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Number Stats */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-16">
                        {data.number_points.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2">
                                    <Counter value={stat.analys_number} start={isInView} />
                                </div>
                                <div className="text-zinc-500 dark:text-zinc-400 font-medium">
                                    {stat.analys_name}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
