import { getAboutPageData, getHomePageData } from "@/lib/api";
import AboutHero from "@/components/about/AboutHero";
import AboutContent from "@/components/about/AboutContent";
import AboutExpertise from "@/components/about/AboutExpertise";
import ShortSection from "@/components/home/ShortSection";

export const metadata = {
  title: "About Us | Asicargo",
  description: "Learn more about Asicargo and our mission to provide simple and reliable shipping to Sri Lanka.",
};

export default async function AboutPage() {
  const data = await getAboutPageData();
  const homeData = await getHomePageData();

  // Use Home page data as fallback if About page data is missing specific fields
  const pointsAbout = (data.points_about && data.points_about.length > 0) 
    ? data.points_about 
    : (homeData.about_points || []);

  const numberPoints = (data.number_points && data.number_points.length > 0)
    ? data.number_points
    : (homeData.number_points || []);

  // Hardcoded fallback for expertise if not in DB yet
  const expertise = (data.expertise && data.expertise.length > 0)
    ? data.expertise
    : [
        { expertise_name: "Freight Forwarding", expertise_range: "96" },
        { expertise_name: "Customs Clearance", expertise_range: "94" },
        { expertise_name: "Warehousing & Distribution", expertise_range: "100" },
        { expertise_name: "Safety delivering", expertise_range: "100" }
      ];

  return (
    <main className="min-h-screen">
      <AboutHero 
        data={{
          hero_main_title_about: data.hero_main_title_about || "About Us",
          hero_sub_title_about: data.hero_sub_title_about || "Simple and Reliable Shipping to Sri Lanka",
          about_section_background: data.about_section_background || { url: "" }
        }} 
      />
      
      <AboutContent 
        data={{
            about_image: data.about_image,
            about_us_title: data.about_us_title || "About Us",
            about_us_sub_title: data.about_us_sub_title || "",
            more_details_about_us: data.more_details_about_us || "",
            points_about: pointsAbout
        }}
      />

      <AboutExpertise 
        data={{
            our_expertise: data.our_expertise || "Our Expertise",
            expertise: expertise,
            number_points: numberPoints
        }}
      />

      <ShortSection 
        data={{
            short_section_title: homeData.short_section_title,
            short_section_sub_title: homeData.short_section_sub_title,
            short_section_description: homeData.short_section_description,
            short_section_image: homeData.short_section_image,
            get_started_now_button: homeData.get_started_now_button,
            get_started_now_button_link: homeData.get_started_now_button_link,
            feedback: homeData.feedback,
            happy_clients_: homeData.happy_clients_
        }}
      />
      
      {/* Footer is now in layout.tsx */}
    </main>
  );
}
