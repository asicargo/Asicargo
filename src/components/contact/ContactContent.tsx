"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Send, Clock, PhoneCall, MapPin, Mail, Phone, ChevronRight } from "lucide-react";

interface ContactDetail {
  contact_icon?: { url: string; alt?: string };
  contact_name?: string;
  contact_title?: string;
  contact_details: string;
}

interface SocialMedia {
  social_meida_icon: { url: string; alt?: string };
  social_url: string;
}

interface ContactContentProps {
  contactSL: ContactDetail[];
  contactDubai: ContactDetail[];
  socialMedia: SocialMedia[];
  hotline?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function getDetailHref(contact: ContactDetail) {
  const label = (contact.contact_name || contact.contact_title || "").toLowerCase();
  if (label.includes("phone") || label.includes("call")) {
    return `tel:${contact.contact_details.replace(/[^0-9+]/g, "")}`;
  }
  if (label.includes("mail") || label.includes("email")) {
    return `mailto:${contact.contact_details}`;
  }
  return null;
}

function ContactIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("phone") || lower.includes("call")) return <Phone className="w-4 h-4" />;
  if (lower.includes("mail") || lower.includes("email")) return <Mail className="w-4 h-4" />;
  return <MapPin className="w-4 h-4" />;
}

function OfficeCard({
  title,
  flag,
  details,
  delay,
}: {
  title: string;
  flag: string;
  details: ContactDetail[];
  delay: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="group flex-1 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-400 p-7"
    >
      {/* Top icon */}
      <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-4">
        <MapPin className="w-5 h-5" />
      </div>

      <h3 className="text-lg font-bold text-zinc-900 mb-5">{title}</h3>

      <ul className="flex flex-col gap-4">
        {details.map((d, i) => {
          const label = d.contact_name || d.contact_title || "";
          const href = getDetailHref(d);
          const row = (
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                <ContactIcon name={label} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-0.5">{label}</p>
                <p className="text-zinc-700 text-sm leading-relaxed">{d.contact_details}</p>
              </div>
            </div>
          );
          return href ? (
            <li key={i}><a href={href} className="hover:text-orange-500 transition-colors block">{row}</a></li>
          ) : (
            <li key={i}>{row}</li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default function ContactContent({ contactSL, contactDubai, socialMedia, hotline }: ContactContentProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => setFormStatus("sent"), 1800);
  }

  return (
    <section ref={sectionRef} className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Office Cards ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-5 mb-20"
        >
          <OfficeCard title="Dubai Office" flag="🇦🇪" details={contactDubai} delay={0} />
          <OfficeCard title="Sri Lanka Office" flag="🇱🇰" details={contactSL} delay={0.1} />
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-4 mb-14"
        >
          <div className="flex-1 h-px bg-zinc-100" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 px-4 whitespace-nowrap">
            Send Us a Message
          </span>
          <div className="flex-1 h-px bg-zinc-100" />
        </motion.div>

        {/* ── Form + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">

          {/* LEFT — Form */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl font-bold text-zinc-900 mb-2">
              Send Us a Message
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.05} className="text-zinc-500 mb-8 text-sm leading-relaxed">
              Have a specific inquiry? Fill out the form below and our team will get back to you within 24 hours.
            </motion.p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <motion.div variants={fadeUp} custom={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-500">Full Name</label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="John Doe" required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-500">Email Address</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="john@example.com" required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all text-sm"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.15} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500">Subject</label>
                <input
                  name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Shipment Quote / Inquiry" required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all text-sm"
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={0.2} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500">Your Message</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="How can we help you?" required rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all text-sm resize-none"
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={0.25}>
                <motion.button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  whileHover={{ scale: formStatus === "idle" ? 1.02 : 1 }}
                  whileTap={{ scale: formStatus === "idle" ? 0.97 : 1 }}
                  className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-300 shadow-md ${
                    formStatus === "sent"
                      ? "bg-green-500 shadow-green-100"
                      : "bg-orange-500 hover:bg-orange-600 shadow-orange-100"
                  }`}
                >
                  {formStatus === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
                  {formStatus === "sending" && (
                    <><motion.span animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    /> Sending...</>
                  )}
                  {formStatus === "sent" && <><ChevronRight className="w-4 h-4" /> Message Sent!</>}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* RIGHT — Sidebar */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-5"
          >
            {/* Operating Hours */}
            <motion.div variants={fadeUp} custom={0} className="rounded-2xl border border-zinc-100 bg-white shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-orange-500" />
                <h4 className="font-bold text-zinc-900 text-sm">Operating Hours</h4>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { day: "Monday – Friday", time: "08:00 AM – 06:00 PM", closed: false },
                  { day: "Saturday",        time: "09:00 AM – 01:00 PM", closed: false },
                  { day: "Sunday",          time: "Closed",               closed: true  },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">{row.day}</span>
                    <span className={row.closed ? "text-orange-500 font-semibold" : "text-zinc-800 font-medium"}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Contact / Hotline */}
            <motion.div variants={fadeUp} custom={0.1} className="rounded-2xl border border-zinc-100 bg-white shadow-sm p-6">
              <div className="flex items-center gap-2 mb-1.5">
                <PhoneCall className="w-4 h-4 text-orange-500" />
                <h4 className="font-bold text-zinc-900 text-sm">Quick Contact</h4>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Reach out to us via our 24/7 hotline for emergency logistics support.
              </p>
              {hotline && (
                <motion.a
                  href={`tel:${hotline.replace(/[^0-9+]/g, "")}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center justify-center gap-1 w-full py-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-100 transition-all duration-300"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-100">24/7 Hotline</span>
                  <span className="text-2xl font-bold tracking-tight">{hotline}</span>
                </motion.a>
              )}
            </motion.div>

            {/* Follow Us */}
            {socialMedia?.length > 0 && (
              <motion.div variants={fadeUp} custom={0.2} className="rounded-2xl border border-zinc-100 bg-white shadow-sm p-6">
                <h4 className="font-bold text-zinc-900 text-sm mb-4">Follow Us</h4>
                <div className="flex items-center gap-3">
                  {socialMedia.map((s, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={s.social_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 hover:bg-orange-500 flex items-center justify-center transition-all duration-300 group"
                      >
                        <Image
                          src={s.social_meida_icon?.url || ""}
                          alt="Social"
                          width={16}
                          height={16}
                          className="opacity-60 group-hover:opacity-100 group-hover:invert transition-all"
                          unoptimized
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
