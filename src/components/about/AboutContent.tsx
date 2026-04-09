"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface AboutContentProps {
  data: {
    about_image?: Array<{
      image_about_us: {
        url: string;
        alt?: string;
      };
    }>;
    about_us_title: string;
    about_us_sub_title: string;
    more_details_about_us: string;
    points_about?: Array<{
      icon_about_point: {
        url: string;
      };
      about_point_detail: string;
    }>;
  };
}

export default function AboutContent({ data }: AboutContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const images = data.about_image || [];
  const mainImage = images[0]?.image_about_us;
  const secondaryImage = images[1]?.image_about_us;

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 bg-white dark:bg-zinc-950 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Images */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800"
            >
              {mainImage && (
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={mainImage.url}
                    alt={mainImage.alt || "About Asicargo"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
            </motion.div>

            {/* Secondary Overlapping Image */}
            {secondaryImage && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 50, scale: 0.9 }
                }
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="absolute -bottom-10 -right-6 md:-bottom-16 md:-right-12 w-2/3 md:w-1/2 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-zinc-800 z-20"
              >
                <div className="relative aspect-square">
                  <Image
                    src={secondaryImage.url}
                    alt={secondaryImage.alt || "Logistics"}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* Decorative Circle */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right Column: Content */}
          <div className="lg:pl-12 mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4">
                {data.about_us_title}
              </h3>
              <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold text-zinc-900 dark:text-white mb-6 leading-[1.15] tracking-tight">
                {data.about_us_sub_title}
              </h2>

              <div
                className="text-slate-500 dark:text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl"
                dangerouslySetInnerHTML={{
                  __html: data.more_details_about_us.replace(
                    /Our services include Full Container Load \(FCL\), Less than Container Load \(LCL\), customs brokerage, and door-to-door delivery, making international shipping simple and convenient for our customers\./g,
                    ""
                  ),
                }}
              />

              {/* Points List */}
              {data.points_about && data.points_about.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-10">
                  {data.points_about.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="shrink-0">
                        {point.icon_about_point?.url ? (
                          <img
                            src={point.icon_about_point.url}
                            alt="icon"
                            className="w-6 h-6 object-contain"
                            style={{
                              filter:
                                "invert(62%) sepia(80%) saturate(4649%) hue-rotate(345deg) brightness(101%) contrast(97%)",
                            }}
                            onError={(e) => {
                                // Fallback if image fails to load
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextElementSibling?.classList.remove("hidden");
                            }}
                          />
                        ) : null}
                        {/* Fallback Icon */}
                        <div className={`${point.icon_about_point?.url ? "hidden" : ""} text-orange-500`}>
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                      </div>
                      <span className="font-medium text-[#0A1629] dark:text-zinc-100 text-[17px] leading-tight">
                        {point.about_point_detail}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
