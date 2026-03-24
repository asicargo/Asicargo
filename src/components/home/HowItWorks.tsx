"use client";

import { motion } from "framer-motion";

interface HowItWorksProps {
    data: {
        main_title_how_it_works?: string;
        heading_of_how_it_works?: string;
        how_it_works_steps?: string;
    };
}

export default function HowItWorks({ data }: HowItWorksProps) {
    const stepsHtml = data?.how_it_works_steps || "";
    // Robustly extract content inside <li> tags
    const stepMatches = Array.from(stepsHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g));
    const steps = stepMatches.map(m => m[1]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    if (!steps || steps.length === 0) return null;

    return (
        <section className="relative w-full py-24 bg-white overflow-hidden">
            {/* Dynamic Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/5 via-white to-white px-2"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-md border border-orange-500/30 bg-orange-500/10 text-orange-600 text-sm font-semibold uppercase tracking-wider"
                    >
                        {data?.main_title_how_it_works || "How it works"}
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight"
                    >
                        {data?.heading_of_how_it_works || "How UAE to Sri Lanka Cargo Shipping Works"}
                    </motion.h2>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className="relative group p-8 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10"
                        >
                            {/* Giant background number */}
                            <div className="absolute top-4 right-4 text-8xl font-black text-zinc-900/[0.03] group-hover:text-orange-500/[0.05] transition-colors duration-500 pointer-events-none select-none">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            
                            {/* Step icon circle */}
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6 border border-orange-200 group-hover:scale-110 group-hover:bg-orange-200 transition-all duration-300">
                                <span className="text-orange-600 font-bold text-lg">{index + 1}</span>
                            </div>
                            
                            {/* Inner HTML parsed content */}
                            <div 
                                className="text-zinc-600 text-[17px] leading-relaxed relative z-10 font-light [&>span]:text-zinc-700 [&>span]:font-normal"
                                dangerouslySetInnerHTML={{ __html: step }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
