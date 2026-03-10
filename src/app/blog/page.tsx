import { getBlogPageData, getBlogPosts } from "@/lib/api";
import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";

// ISR: revalidate every 60 s so new/updated WP posts appear within 1 minute
export const revalidate = 60;

export const metadata = {
    title: "Blog | Asicargo",
    description: "Latest news, updates and insights from Asicargo.",
};

export default async function BlogPage() {
    const [pageData, posts] = await Promise.all([
        getBlogPageData().catch(() => ({})),
        getBlogPosts(),
    ]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <BlogHero
                title={(pageData as any).blog_title || "Our Blog"}
                subtitle={(pageData as any).blog_sub_title || "Stay updated with the latest logistics insights"}
                backgroundImageUrl={(pageData as any).blog_background_image?.url}
            />
            <BlogList posts={posts} />
        </div>
    );
}
