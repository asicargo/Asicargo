import { getContactPageData, getHomePageData } from "@/lib/api";
import ContactHero from "@/components/contact/ContactHero";
import ContactContent from "@/components/contact/ContactContent";

export const revalidate = 60;

export const metadata = {
    title: "Contact | Asicargo",
    description: "Get in touch with Asicargo. Your shipments, our priority.",
};

export default async function ContactPage() {
    const [heroData, homeData] = await Promise.all([
        getContactPageData().catch(() => ({
            contact_title: "Contact Us",
            contac_t_sub_title: "Your Shipments, Our Priority.",
            hero_background: null,
        })),
        getHomePageData().catch(() => ({})),
    ]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <ContactHero data={heroData} />
            <ContactContent
                contactSL={(homeData as any).contact_details_sri_lanka || []}
                contactDubai={(homeData as any).contact_details_dubai || []}
                socialMedia={(homeData as any).social_media || []}
                hotline={(homeData as any).hotline_number || "0112 656 555"}
            />
        </div>
    );
}
