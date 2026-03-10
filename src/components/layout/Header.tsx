"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  header_logo: {
    url: string;
    alt?: string;
  };
  menu: Array<{
    menu_name: string;
    menu_url: string;
  }>;
}

export default function Header({ header_logo, menu }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background blur logic
      setIsScrolled(currentScrollY > 20);

      // Hide/Show logic based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down past threshold -> Hide header & close menu
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> Show header
        setIsVisible(true);
      }

      // Update last scroll position
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check in case of page refresh while scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled || isMobileMenuOpen
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800"
          : "bg-white dark:bg-zinc-950 border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 block"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src={header_logo.url}
            alt={header_logo.alt || "Asicargo"}
            width={200}
            height={200}
            className="w-auto h-24 object-contain"
            unoptimized
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {menu.map((item: any, i: number) => {
            const href =
              item.menu_name.toLowerCase() === "home"
                ? "/"
                : item.menu_name.toLowerCase() === "services"
                  ? "/services"
                  : item.menu_name.toLowerCase() === "tracking"
                    ? "/tracking"
                    : item.menu_name.toLowerCase() === "about" ||
                      item.menu_name.toLowerCase() === "about us"
                      ? "/about"
                      : item.menu_name.toLowerCase() === "blog"
                        ? "/blog"
                        : item.menu_url || "#";

            const isActive = pathname === href;

            return (
              <Link
                key={i}
                href={href}
                className={`text-sm font-medium transition-colors ${isActive
                    ? "text-orange-500"
                    : "text-zinc-600 hover:text-orange-500 dark:text-zinc-300 dark:hover:text-orange-500"
                  }`}
              >
                {item.menu_name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/book"
            className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold tracking-wide transition-colors"
          >
            Book Shipment
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden relative z-10 p-2 text-zinc-900 dark:text-zinc-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 transition-all duration-300 overflow-hidden ${isMobileMenuOpen
            ? "max-h-[calc(100vh-5rem)] opacity-100 py-4 shadow-lg border-b border-zinc-200 dark:border-zinc-800"
            : "max-h-0 opacity-0 py-0 border-transparent"
          }`}
      >
        <nav className="flex flex-col px-6 gap-4 overflow-y-auto max-h-[calc(100vh-7rem)] pb-6">
          {menu.map((item: any, i: number) => {
            const href =
              item.menu_name.toLowerCase() === "home"
                ? "/"
                : item.menu_name.toLowerCase() === "services"
                  ? "/services"
                  : item.menu_name.toLowerCase() === "tracking"
                    ? "/tracking"
                    : item.menu_name.toLowerCase() === "about" ||
                      item.menu_name.toLowerCase() === "about us"
                      ? "/about"
                      : item.menu_name.toLowerCase() === "blog"
                        ? "/blog"
                        : item.menu_url || "#";

            const isActive = pathname === href;

            return (
              <Link
                key={i}
                href={href}
                className={`text-base font-medium transition-colors py-2 border-b border-zinc-100 dark:border-zinc-800/50 ${isActive
                    ? "text-orange-500"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-500"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.menu_name}
              </Link>
            );
          })}
          <Link
            href="/book"
            className="mt-4 px-6 py-3 text-center rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold tracking-wide transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Shipment
          </Link>
        </nav>
      </div>
    </header>
  );
}
