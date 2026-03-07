export async function getHomePageData() {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) {
        throw new Error("NEXT_PUBLIC_WORDPRESS_URL is not defined in the environment variables.");
    }

    // Use the REST API to fetch the home page data (assuming slug 'home' maps to ID 95 as seen previously).
    // The ?_fields=acf parameter ensures we get only the needed ACF data, improving performance.
    const res = await fetch(`${url}wp-json/wp/v2/pages?slug=home`, {
        next: { revalidate: 60 } // Revalidate every 60 seconds (ISR)
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch home page data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || data.length === 0) {
        throw new Error("Home page data not found in WordPress.");
    }

    return data[0].acf;
}
