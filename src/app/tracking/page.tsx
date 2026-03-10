import { getTrackingPageData, getHomePageData } from "@/lib/api";
import TrackingHero from "./TrackingHero";
import ShipmentProgress from "./ShipmentProgress";
import TrackingSearch from "./TrackingSearch";
import ActivityLog from "./ActivityLog";

export async function generateMetadata() {
    return {
        title: "Tracking | Asicargo",
        description: "Track your shipment real-time",
    };
}

export default async function TrackingPage() {
    const data = await getTrackingPageData();
    // We might still need acf for other things if added later, but for now Footer was the only user of acf
    // actually getHomePageData was only used for acf which was only used for Footer.
    // So I can remove getHomePageData call as well if it's not used elsewhere.
    // Let's check if acf is used anywhere else.
    // In the previous read, acf was only used in <Footer data={...} />
    
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
            {/* 1. Dynamic Parallax Hero */}
            <TrackingHero data={data} />

            {/* 2. Shipment Progress Stepper */}
            <div className="-mt-16 lg:-mt-20">
                <ShipmentProgress />
            </div>

            {/* 3. Map Animation & Search Input */}
            <TrackingSearch data={data} />

            {/* 4. Activity Log Display */}
            <div className="-mt-10 lg:-mt-16 mb-12">
                <ActivityLog />
            </div>
        </div>
    );
}
