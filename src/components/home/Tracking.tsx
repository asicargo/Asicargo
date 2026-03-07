"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

interface TrackingProps {
    data: any;
}

export default function Tracking({ data: trackingData }: TrackingProps) {
    const [trackingNumber, setTrackingNumber] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section className="w-full relative z-30 mt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="pointer-events-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/40 ring-1 ring-black/5"
            >
                {/* Left Side: Title & Description */}
                <div className="flex-shrink-0 text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">
                        {trackingData.tracking_title}
                    </h2>
                    <div
                        className="text-slate-500 text-sm sm:text-base prose prose-sm prose-p:m-0"
                        dangerouslySetInnerHTML={{ __html: trackingData.tracking_description }}
                    />
                </div>

                {/* Right Side: Input & Button */}
                <div className="w-full max-w-xl relative flex items-center group">
                    <div className="absolute left-4 z-10 opacity-40 group-focus-within:opacity-100 transition-opacity flex items-center justify-center">
                        {trackingData.search_icon?.url ? (
                            <img
                                src={trackingData.search_icon.url}
                                alt={trackingData.search_icon?.alt || "Search"}
                                width={20}
                                height={20}
                                className="text-slate-900"
                            />
                        ) : (
                            <div className="w-5 h-5 bg-slate-300 rounded-full" />
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter tracking number (Ex: LK-DXB-12345)"
                        className="w-full h-16 pl-12 pr-32 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all shadow-inner placeholder:text-slate-400 font-medium"
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="absolute right-2 top-2 bottom-2 bg-[#0A1629] hover:bg-[#112444] text-white px-6 sm:px-8 rounded-lg font-semibold transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                        Track
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
