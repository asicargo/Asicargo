import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asicargo | Stress Free Door to Door Cargo",
  description: "Direct routes weekly, secure cargo, door delivery, best rates.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  },
};

import { getHomePageData } from "@/lib/api";

import Footer from "@/components/home/Footer";
import BottomBar from "@/components/home/BottomBar";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const acf = await getHomePageData();

  // Ensure About page is in the menu (temporary fix until added in WP)
  const menu = acf.menu || [];
  const hasAbout = menu.some(
    (item: any) =>
      item.menu_name.toLowerCase() === "about" ||
      item.menu_name.toLowerCase() === "about us",
  );

  if (!hasAbout) {
    menu.push({
      menu_name: "About",
      menu_url: "/about",
    });
  }

  const hasBlog = menu.some(
    (item: any) =>
      item.menu_name.toLowerCase() === "blog" ||
      item.menu_name.toLowerCase() === "blogs",
  );

  if (!hasBlog) {
    menu.push({
      menu_name: "Blog",
      menu_url: "/blog",
    });
  }

  const hasContact = menu.some(
    (item: any) =>
      item.menu_name.toLowerCase() === "contact" ||
      item.menu_name.toLowerCase() === "contact us",
  );

  if (!hasContact) {
    menu.push({
      menu_name: "Contact",
      menu_url: "/contact",
    });
  }

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header
          header_logo={acf.header_logo}
          bookShipmentLink={acf.book_shipment_button_link}
          menu={menu}
        />
        <main className="min-h-screen flex flex-col">{children}</main>
        <BottomBar data={acf} />
        <Footer data={acf} />
        <ScrollToTop />
      </body>
    </html>
  );
}
