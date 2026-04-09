export async function getBlogPageData() {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) return {};

    let data;
    try {
        const res = await fetch(`${url}wp-json/wp/v2/pages?slug=blog-page`, {
            next: { revalidate: 60 }
        });
        if (res.ok) data = await res.json();
    } catch (e) {
        console.warn("Failed to fetch blog page data:", e);
    }

    if (!data || data.length === 0) {
        return {};
    }

    return data[0].acf;
}

export async function getBlogPosts() {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) return [];

    let data;
    try {
        const res = await fetch(`${url}wp-json/wp/v2/blog?per_page=100`, {
            next: { revalidate: 60 }
        });
        if (res.ok) data = await res.json();
    } catch (e) {
        console.warn("Failed to fetch blog posts:", e);
    }

    if (!data || !Array.isArray(data)) {
        return [];
    }

    // Sort newest first using acf.blog_date (dd/mm/yyyy) falling back to WP date (ISO)
    const parseDate = (post: any): number => {
        const raw: string = post?.acf?.blog_date || post?.date || "";
        const parts = raw.split("/");
        if (parts.length === 3) {
            // dd/mm/yyyy → mm/dd/yyyy for Date constructor
            return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`).getTime();
        }
        return new Date(raw).getTime() || 0;
    };

    return [...data].sort((a, b) => parseDate(b) - parseDate(a));
}

export async function getBlogPost(slug: string) {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) return null;

    let data;
    try {
        const res = await fetch(`${url}wp-json/wp/v2/blog?slug=${slug}`, {
            next: { revalidate: 60 }
        });
        if (res.ok) data = await res.json();
    } catch (e) {
        console.warn(`Failed to fetch blog post ${slug}:`, e);
    }

    if (!data || data.length === 0) {
        return null;
    }

    return data[0];
}

export async function getHomePageData() {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) return { header_logo: { url: "/favicon.png" }, menu: [] };

    let data;
    try {
        const res = await fetch(`${url}wp-json/wp/v2/pages?slug=home`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds (ISR)
        });
        if (res.ok) data = await res.json();
    } catch (e) {
        console.warn("Failed to fetch home page data:", e);
    }

    if (!data || data.length === 0) {
        return { header_logo: { url: "/favicon.png" }, menu: [] };
    }

    return data[0].acf;
}

export async function getServicesPageData() {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) return {};

    let data;
    try {
        const res = await fetch(`${url}wp-json/wp/v2/pages?slug=services-page`, {
            next: { revalidate: 60 }
        });
        if (res.ok) data = await res.json();
    } catch (e) {
        console.warn("Failed to fetch services page data:", e);
    }

    if (!data || data.length === 0) {
        return {};
    }

    return data[0].acf;
}

export async function getTrackingPageData() {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) return {};

    let data;
    try {
        const res = await fetch(`${url}wp-json/wp/v2/pages?slug=tracking-page`, {
            next: { revalidate: 60 }
        });
        if (res.ok) data = await res.json();
    } catch (e) {
        console.warn("Failed to fetch tracking page data:", e);
    }

    if (!data || data.length === 0) {
        return {};
    }

    return data[0].acf;
}

export async function getAboutPageData() {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) return getAboutFallback();

    let data;
    try {
        const res = await fetch(`${url}wp-json/wp/v2/pages?slug=about-page`, {
            next: { revalidate: 60 }
        });
        if (res.ok) data = await res.json();
    } catch (e) {
        console.warn("Failed to fetch about page data:", e);
    }

    if (!data || data.length === 0) {
        console.warn("About page data not found in WordPress, using mock data.");
        return getAboutFallback();
    }

    return data[0].acf;
}

function getAboutFallback() {
    return {
        hero_main_title_about: "About us",
        hero_sub_title_about: "Simple and Reliable Shipping to Sri Lanka",
        about_section_background: {
            url: "http://asicargo.local/wp-content/uploads/2026/03/vecteezy_three-men-in-orange-safety-vests-walking-through-a-foggy_71101937-scaled.jpeg",
            alt: "About Us Hero Background"
        },
        about_image: [
            {
                acf_fc_layout: "images_about",
                image_about_us: {
                    url: "http://asicargo.local/wp-content/uploads/2026/03/vecteezy_container-ship-navigating-calm-waters-ocean-maritime-scene_60654897-scaled.jpeg",
                    alt: "Container ship"
                }
            },
            {
                acf_fc_layout: "images_about",
                image_about_us: {
                    url: "http://asicargo.local/wp-content/uploads/2026/03/vecteezy_logistics-shipping-and-construction-worker-using-walkie_22713248.jpg-scaled.jpeg",
                    alt: "Logistics worker"
                }
            }
        ],
        about_us_title: "About Us",
        about_us_sub_title: "Moving Your Cargo Safely to Sri Lanka",
        more_details_about_us: `<p>Asicargo is a reliable sea freight logistics company providing efficient cargo transportation between Dubai and Sri Lanka. We specialize in safe, cost-effective, and timely shipping solutions for both individuals and businesses.</p>
<p>From personal packages to full container shipments, our experienced team manages every step of the logistics process including cargo handling, customs clearance, and delivery. With a strong logistics network and professional support, we ensure your cargo reaches its destination securely and on time.</p>`,
        our_expertise: "Our Expertise",
        expertise: [
            {
                acf_fc_layout: "expertise",
                expertise_name: "Freight Forwarding",
                expertise_range: "96"
            },
            {
                acf_fc_layout: "expertise",
                expertise_name: "Customs Clearance",
                expertise_range: "94"
            },
            {
                acf_fc_layout: "expertise",
                expertise_name: "Warehousing & Distribution",
                expertise_range: "100"
            },
            {
                acf_fc_layout: "expertise",
                expertise_name: "Safety delivering",
                expertise_range: "100"
            }
        ]
    };
}

export async function getContactPageData() {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!url) return getContactFallback();

    let data;
    try {
        const res = await fetch(`${url}wp-json/wp/v2/pages?slug=contact-page`, {
            next: { revalidate: 60 }
        });
        if (res.ok) data = await res.json();
    } catch (e) {
        console.warn("Failed to fetch contact page data:", e);
    }

    if (!data || data.length === 0) {
        return getContactFallback();
    }

    return data[0].acf;
}

function getContactFallback() {
    return {
        contact_title: "Contact Us",
        contac_t_sub_title: "Your Shipments, Our Priority.",
        hero_background: null,
    };
}
