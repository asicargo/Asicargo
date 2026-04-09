"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Package } from "lucide-react";

interface HeaderProps {
  header_logo: {
    url: string;
    alt?: string;
  };
  bookShipmentLink?: string;
  menu: Array<{
    menu_name: string;
    menu_url: string;
  }>;
}

function resolveHref(item: { menu_name: string; menu_url: string }): string {
  const name = item.menu_name.toLowerCase();
  if (name === "home") return "/";
  if (name === "services") return "/services";
  if (name === "tracking") return "/tracking";
  if (name === "about" || name === "about us") return "/about";
  if (name === "blog") return "/blog";
  if (name === "contact" || name === "contact us") return "/contact";
  return item.menu_url || "#";
}

export default function Header({
  header_logo,
  bookShipmentLink,
  menu,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const ctaHref =
    (typeof bookShipmentLink === "string" ? bookShipmentLink : "").trim() ||
    "/book";
  const isCtaExternal =
    /^https?:\/\//i.test(ctaHref) || ctaHref.startsWith("//");

  /* ─── Scroll behaviour ─── */
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ─── Active nav indicator ─── */
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(
      "[data-active='true']",
    );
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setActiveIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    } else {
      setActiveIndicator({ left: 0, width: 0 });
    }
  }, [pathname]);

  const scrolled = isScrolled || isMobileMenuOpen;

  return (
    <>
      {/* ─── Inline Styles ─── */}
      <style>{`
        @keyframes hdr-slide-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hdr-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes hdr-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .hdr-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          transition: transform 0.35s cubic-bezier(.4,0,.2,1),
                      background 0.35s ease,
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
        }
        .hdr-root.hidden-nav { transform: translateY(-110%); }
        .hdr-root.visible-nav { transform: translateY(0); }

        /* ── Top state (always visible) ── */
        .hdr-root.top-state {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border-bottom: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }

        /* ── Scrolled glass state ── */
        .hdr-root.scrolled-state {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255,255,255,0.5);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 4px 24px rgba(0,0,0,0.08);
        }

        /* ── Inner container ── */
        .hdr-inner {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 4.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        /* ── Logo ── */
        .hdr-logo {
          position: relative;
          z-index: 10;
          display: block;
          transition: opacity 0.2s;
        }
        .hdr-logo:hover { opacity: 0.85; }

        /* ── Desktop nav wrapper ── */
        .hdr-nav-wrap {
          position: relative;
          display: none;
          align-items: center;
          gap: 0.25rem;
        }
        @media (min-width: 768px) { .hdr-nav-wrap { display: flex; } }

        /* ── Nav link ── */
        .hdr-link {
          position: relative;
          padding: 0.4rem 0.85rem;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #3f3f46;
          text-decoration: none;
          border-radius: 9999px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .hdr-link:hover { color: #f97316; }
        .hdr-link.active { color: #ea580c; font-weight: 600; }

        /* Sliding pill indicator */
        .hdr-pill {
          position: absolute;
          bottom: 0;
          height: 100%;
          background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(234,88,12,0.06));
          border-radius: 9999px;
          border: 1px solid rgba(249,115,22,0.2);
          pointer-events: none;
          transition: left 0.3s cubic-bezier(.4,0,.2,1), width 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s;
        }

        /* ── CTA button ── */
        .hdr-cta {
          display: none;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          box-shadow: 0 2px 12px rgba(249,115,22,0.35), 0 0 0 0 rgba(249,115,22,0);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) { .hdr-cta { display: flex; } }
        .hdr-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: hdr-shimmer 2.8s linear infinite;
          border-radius: inherit;
          pointer-events: none;
        }
        .hdr-cta:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 6px 20px rgba(249,115,22,0.45), 0 0 0 3px rgba(249,115,22,0.15);
          background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
        }
        .hdr-cta:active { transform: scale(0.98); }

        /* ── Hamburger ── */
        .hdr-ham {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(8px);
          color: #18181b;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        @media (min-width: 768px) { .hdr-ham { display: none; } }
        .hdr-ham:hover { background: rgba(249,115,22,0.08); border-color: rgba(249,115,22,0.3); }
        .hdr-ham:active { transform: scale(0.94); }

        /* ── Mobile drawer ── */
        .hdr-drawer {
          position: absolute;
          top: 100%;
          left: 0; right: 0;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          border-bottom: 1px solid rgba(255,255,255,0.5);
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.3s ease, padding 0.3s;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        .hdr-drawer.open  { max-height: 600px; opacity: 1; padding: 1rem 0 1.5rem; }
        .hdr-drawer.closed { max-height: 0; opacity: 0; padding: 0; }

        .hdr-drawer-inner { padding: 0 1.5rem; display: flex; flex-direction: column; gap: 0.25rem; }

        .hdr-mob-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #3f3f46;
          text-decoration: none;
          border-radius: 0.75rem;
          transition: background 0.15s, color 0.15s;
          animation: hdr-slide-in 0.25s ease both;
        }
        .hdr-mob-link:hover { background: rgba(249,115,22,0.07); color: #ea580c; }
        .hdr-mob-link.active { background: rgba(249,115,22,0.1); color: #ea580c; font-weight: 600; }

        .hdr-mob-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          box-shadow: 0 4px 16px rgba(249,115,22,0.35);
          transition: opacity 0.2s, transform 0.2s;
          animation: hdr-fade-in 0.3s ease 0.1s both;
        }
        .hdr-mob-cta:hover { opacity: 0.9; transform: scale(1.01); }

        /* ── Gradient top accent line ── */
        .hdr-accent-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #f97316 40%, #fb923c 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .hdr-root.scrolled-state .hdr-accent-line { opacity: 1; }
      `}</style>

      <header
        className={[
          "hdr-root",
          isVisible ? "visible-nav" : "hidden-nav",
          scrolled ? "scrolled-state" : "top-state",
        ].join(" ")}
      >
        {/* Gradient accent line at top */}
        <div className="hdr-accent-line" />

        <div className="hdr-inner">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="hdr-logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src={header_logo.url}
              alt={header_logo.alt || "Asicargo"}
              width={200}
              height={200}
              className="w-auto h-20 object-contain"
              unoptimized
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hdr-nav-wrap" ref={navRef}>
            {/* Sliding pill */}
            {activeIndicator.width > 0 && (
              <span
                className="hdr-pill"
                style={{
                  left: activeIndicator.left,
                  width: activeIndicator.width,
                }}
              />
            )}
            {menu.map((item, i) => {
              const href = resolveHref(item);
              const isActive = pathname === href;
              return (
                <Link
                  key={i}
                  href={href}
                  data-active={isActive ? "true" : undefined}
                  className={`hdr-link${isActive ? " active" : ""}`}
                >
                  {item.menu_name}
                </Link>
              );
            })}
          </div>

          {/* ── CTA Button ── */}
          {isCtaExternal ? (
            <a
              href={ctaHref}
              className="hdr-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Package size={14} strokeWidth={2.5} />
              Book Shipment
            </a>
          ) : (
            <Link href={ctaHref} className="hdr-cta">
              <Package size={14} strokeWidth={2.5} />
              Book Shipment
            </Link>
          )}

          {/* ── Mobile Hamburger ── */}
          <button
            className="hdr-ham"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        <div className={`hdr-drawer ${isMobileMenuOpen ? "open" : "closed"}`}>
          <div className="hdr-drawer-inner">
            {menu.map((item, i) => {
              const href = resolveHref(item);
              const isActive = pathname === href;
              return (
                <Link
                  key={i}
                  href={href}
                  className={`hdr-mob-link${isActive ? " active" : ""}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.menu_name}
                </Link>
              );
            })}
            {isCtaExternal ? (
              <a
                href={ctaHref}
                className="hdr-mob-cta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Package size={16} />
                Book Shipment
              </a>
            ) : (
              <Link
                href={ctaHref}
                className="hdr-mob-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Package size={16} />
                Book Shipment
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
