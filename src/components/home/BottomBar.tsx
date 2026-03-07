"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";

interface BottomBarProps {
    data: {
        slide_bar_title: string;
        slide_bar_sub_title: string;
        book_shipment_button_link: string;
    };
}

const BottomBar: React.FC<BottomBarProps> = ({ data }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="w-full bg-[#FF6600] py-12 md:py-16 lg:py-20 relative overflow-hidden"
        >
            {/* Background design elements for dynamic effect */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-screen filter blur-[80px] opacity-50 -translate-y-1/2 translate-x-1/4"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full mix-blend-screen filter blur-[100px] opacity-30 translate-y-1/3 -translate-x-1/4"
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
                >
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.h2
                            variants={fadeUpVariants}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-2"
                        >
                            {/* The design shows "Ready to ship your cargo Worldwide?" */}
                            {/* We will rely on the dynamic title, but ensure good rendering */}
                            {data.slide_bar_title}
                        </motion.h2>
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-white/90 text-lg md:text-xl font-medium"
                        >
                            {data.slide_bar_sub_title}
                        </motion.p>
                    </div>

                    {/* Right Button */}
                    <motion.div variants={fadeUpVariants} className="flex-shrink-0">
                        <Link href={data.book_shipment_button_link || "#"}>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.15)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-[#FF6600] font-bold text-lg rounded-full shadow-lg transition-all duration-300 whitespace-nowrap"
                            >
                                Book Shipment
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default BottomBar;
