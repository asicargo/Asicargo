import Hero from "@/components/home/Hero";
import Tracking from "@/components/home/Tracking";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
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
    </div>
  );
}
