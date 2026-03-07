"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

interface ServicesProps {
    data: any;
}

export default function Services({ data: servicesData }: ServicesProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="w-full py-24 sm:py-32 bg-[#F8F9FA] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Content */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainerVariants}
                >
                    <motion.h3 variants={fadeUpVariants} className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4">
                        {servicesData.service_main_topic}
                    </motion.h3>
                    <motion.h2 variants={fadeUpVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-6 tracking-tight">
                        {servicesData.service_sub_topic}
                    </motion.h2>
                    <motion.p variants={fadeUpVariants} className="text-slate-500 text-lg sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        {servicesData.service_description}
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainerVariants}
                >
                    {servicesData.services.map((service: any, index: number) => (
                        <motion.div
                            key={index}
                            variants={fadeUpVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex flex-col h-full border border-slate-100"
                        >
                            {/* Icon Container */}
                            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-8">
                                <img
                                    src={service.service_icon.url}
                                    alt={service.service_name}
                                    className="w-7 h-7"
                                    style={{ filter: "invert(62%) sepia(80%) saturate(4649%) hue-rotate(345deg) brightness(101%) contrast(97%)" }} // Orange tint
                                />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                                {service.service_name}
                            </h3>
                            <p className="text-slate-500 text-[15px] leading-relaxed mb-8 flex-grow">
                                {service.service_card_description}
                            </p>

                            {/* Learn More Link */}
                            <motion.button
                                className="group flex items-center gap-2 text-orange-500 font-semibold text-sm mt-auto"
                            >
                                Learn more
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
