import Hero from "@/components/home/Hero";
import Tracking from "@/components/home/Tracking";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ShortSection from "@/components/home/ShortSection";
import BottomBar from "@/components/home/BottomBar";
import Footer from "@/components/home/Footer";
import { getHomePageData } from "@/lib/api";

export default async function Home() {
  const acf = await getHomePageData();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={acf.hero_section[0]} />
      <Tracking data={{
        tracking_title: acf.tracking_title,
        tracking_description: acf.tracking_description,
        search_icon: acf.search_icon || { url: "/search.svg" } // Fallback if missing
      }} />
      <About data={{
        about_us_image: acf.about_us_image,
        about_title: acf.about_title,
        about_sub_title: acf.about_sub_title,
        about_description: acf.about_description,
        about_points: acf.about_points,
        number_points: acf.number_points
      }} />
      <Services data={{
        service_main_topic: acf.service_main_topic,
        service_sub_topic: acf.service_sub_topic,
        service_description: acf.service_description,
        services: acf.services
      }} />
      <WhyChooseUs data={{
        why_choose_us_video: acf.why_choose_us_video,
        choose_us_main_title: acf.choose_us_main_title,
        choose_us_sub_topic: acf.choose_us_sub_topic,
        choose_us_description: acf.choose_us_description,
        choose_us_points: acf.choose_us_points
      }} />
      <ShortSection data={{
        short_section_title: acf.short_section_title,
        short_section_sub_title: acf.short_section_sub_title,
        short_section_description: acf.short_section_description,
        short_section_image: acf.short_section_image,
        get_started_now_button: acf.get_started_now_button,
        get_started_now_button_link: acf.get_started_now_button_link,
        feedback: acf.feedback,
        happy_clients_: acf.happy_clients_
      }} />
      {/* BottomBar is now in layout.tsx */}
      {/* Footer is now in layout.tsx */}
    </div>
  );
}
