"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";

interface ExploreLink {
    acf_fc_layout: string;
    page_name: string;
    page_link: string;
}

interface SupportLink {
    acf_fc_layout: string;
    support_link_name: string;
    support_link_url: string;
}

interface SocialMedia {
    acf_fc_layout: string;
    social_meida_icon: {
        url: string;
        alt?: string;
    };
    social_url: string;
}

interface ContactDetails {
    acf_fc_layout: string;
    contact_icon: {
        url: string;
        alt?: string;
    };
    contact_title?: string;
    contact_name?: string;
    contact_details: string;
}

interface FooterProps {
    data: {
        footer_logo: {
            url: string;
            alt?: string;
        };
        footer_description: string;
        explore_links: ExploreLink[];
        support_links: SupportLink[];
        social_media: SocialMedia[];
        contact_details_sri_lanka: ContactDetails[];
        contact_details_dubai: ContactDetails[];
    };
}

const Footer: React.FC<FooterProps> = ({ data }) => {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: "-10%" });


    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const renderContactDetails = (contact: ContactDetails) => {
        const title = (contact.contact_name || contact.contact_title || "").toLowerCase();
        const details = contact.contact_details;

        if (title.includes("phone") || title.includes("call")) {
            return (
                <a href={`tel:${details.replace(/[^0-9+]/g, '')}`} className="text-slate-300 text-sm hover:text-orange-500 transition-colors">
                    {details}
                </a>
            );
        } else if (title.includes("mail") || title.includes("email")) {
            return (
                <a href={`mailto:${details}`} className="text-slate-300 text-sm hover:text-orange-500 transition-colors">
                    {details}
                </a>
            );
        }

        return <span className="text-slate-300 text-sm">{details}</span>;
    };

    return (
        <footer
            ref={footerRef}
            className="bg-[#0F172A] text-slate-300 relative overflow-hidden pt-20 pb-8"
        >
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
                >
                    {/* Column 1: Logo & Info */}
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <Link href="/" className="mb-6 inline-block">
                            {data.footer_logo?.url ? (
                                <Image
                                    src={data.footer_logo.url}
                                    alt={data.footer_logo.alt || "AsiCargo Logo"}
                                    width={140}
                                    height={50}
                                    className="object-contain"
                                />
                            ) : (
                                <span className="font-bold text-2xl text-white">ASICARGO</span>
                            )}
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 pr-4">
                            {data.footer_description}
                        </p>

                        <div className="flex items-center gap-4">
                            {Array.isArray(data.social_media) && data.social_media.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.social_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Image
                                        src={social.social_meida_icon?.url || "https://placehold.co/24x24"}
                                        alt="Social"
                                        width={20}
                                        height={20}
                                        className="opacity-70 hover:opacity-100 invert"
                                    />
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <h4 className="text-white font-bold text-lg mb-6 tracking-wide">
                            Company
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {Array.isArray(data.explore_links) && data.explore_links.map((link, index) => {
                                const href = link.page_name.toLowerCase() === 'home'
                                    ? '/'
                                    : link.page_name.toLowerCase() === 'services'
                                        ? '/services'
                                        : link.page_name.toLowerCase() === 'blog'
                                            ? '/blog'
                                            : (link.page_link || "#");

                                return (
                                    <li key={index}>
                                        <Link
                                            href={href}
                                            className="text-slate-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.page_name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>

                    {/* Column 3: Sri Lanka Office */}
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <h4 className="text-white font-bold text-lg mb-6 tracking-wide">
                            Sri Lanka Office
                        </h4>
                        <ul className="flex flex-col gap-5">
                            {Array.isArray(data.contact_details_sri_lanka) && data.contact_details_sri_lanka.map((contact, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="mt-1 mr-3 flex-shrink-0 opacity-70">
                                        <Image
                                            src={contact.contact_icon?.url || "https://placehold.co/24x24"}
                                            alt={contact.contact_name || contact.contact_title || "Icon"}
                                            width={18}
                                            height={18}
                                            className="invert"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        {/* Label text */}
                                        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                                            {contact.contact_name || contact.contact_title}
                                        </span>
                                        {/* Value text or link */}
                                        {renderContactDetails(contact)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4: Dubai Office (Get in Touch) */}
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <h4 className="text-white font-bold text-lg mb-6 tracking-wide">
                            Dubai Office
                        </h4>
                        <ul className="flex flex-col gap-5">
                            {Array.isArray(data.contact_details_dubai) && data.contact_details_dubai.map((contact, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="mt-1 mr-3 flex-shrink-0 opacity-70">
                                        <Image
                                            src={contact.contact_icon?.url || "https://placehold.co/24x24"}
                                            alt={contact.contact_name || contact.contact_title || "Icon"}
                                            width={18}
                                            height={18}
                                            className="invert"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        {/* Label text */}
                                        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                                            {contact.contact_name || contact.contact_title}
                                        </span>
                                        {/* Value text or link */}
                                        {renderContactDetails(contact)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Sub-footer */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 relative"
                >
                    <p className="text-slate-500 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} Asicargo. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        {Array.isArray(data.support_links) && data.support_links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.support_link_url || "#"}
                                className="text-slate-500 hover:text-white transition-colors text-xs"
                            >
                                {link.support_link_name}
                            </Link>
                        ))}
                    </div>


                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
