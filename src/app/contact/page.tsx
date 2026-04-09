import { getContactPageData, getHomePageData } from "@/lib/api";
import ContactHero from "@/components/contact/ContactHero";
import ContactContent from "@/components/contact/ContactContent";

export const revalidate = 60;

export const metadata = {
  title: "Contact | Asicargo",
  description: "Get in touch with Asicargo. Your shipments, our priority.",
};

function coerceHotline(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number") return String(value);
  return undefined;
}

function getHotlineFromAcf(acf: unknown): string | undefined {
  const data = acf as Record<string, unknown> | null | undefined;
  if (!data) return undefined;
  return (
    coerceHotline(data.hotline_number) ||
    coerceHotline(data.hotline) ||
    coerceHotline(data.hotline_phone) ||
    coerceHotline(data.hotline_phone_number) ||
    coerceHotline(data.emergency_hotline) ||
    coerceHotline(data.emergency_hotline_number)
  );
}

function getHotlineFromContactDetails(details: unknown): string | undefined {
  const rows = Array.isArray(details) ? details : [];
  for (const row of rows) {
    const r = row as Record<string, unknown>;
    const label = String(
      r?.contact_name ?? r?.contact_title ?? "",
    ).toLowerCase();
    if (label.includes("hotline")) {
      return coerceHotline(r?.contact_details);
    }
  }
  return undefined;
}

export default async function ContactPage() {
  const [heroData, homeData] = await Promise.all([
    getContactPageData().catch(() => ({
      contact_title: "Contact Us",
      contac_t_sub_title: "Your Shipments, Our Priority.",
      hero_background: null,
    })),
    getHomePageData().catch(() => ({})),
  ]);

  const contactSL = (homeData as any).contact_details_sri_lanka || [];
  const contactDubai = (homeData as any).contact_details_dubai || [];
  const hotline =
    getHotlineFromAcf(heroData) ||
    getHotlineFromAcf(homeData) ||
    getHotlineFromContactDetails(contactSL) ||
    getHotlineFromContactDetails(contactDubai) ||
    "+971 54 449 1770";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ContactHero data={heroData} />
      <ContactContent
        contactSL={contactSL}
        contactDubai={contactDubai}
        socialMedia={(homeData as any).social_media || []}
        hotline={hotline}
      />
    </div>
  );
}
