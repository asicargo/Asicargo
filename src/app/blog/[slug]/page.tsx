import { getBlogPost, getBlogPosts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import BlogSidebar from "@/components/blog/BlogSidebar";

// ISR: revalidate every 60 s — new/updated WP content is live within 1 minute
export const revalidate = 60;
// New slugs not pre-built are server-rendered on first visit, then cached
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts() as Array<{ slug: string }>;
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface AcfBlogImage {
  url: string;
  alt?: string;
  sizes?: { thumbnail?: string; medium?: string; large?: string };
}

interface BlogPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  acf: {
    blog_image: AcfBlogImage | false;
    blog_title: string;
    blog_short_description: string;
    blog_more_description: string;
    blog_date: string;
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug) as BlogPost | null;
  if (!post) return { title: "Post Not Found" };
  const title = post.acf.blog_title || post.title.rendered;
  return {
    title: `${title} | Asicargo Blog`,
    description: post.acf.blog_short_description?.slice(0, 160) || "",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug) as Promise<BlogPost | null>,
    getBlogPosts() as Promise<BlogPost[]>,
  ]);

  if (!post) {
    notFound();
  }

  const title = post.acf.blog_title || post.title.rendered;
  const description = post.acf.blog_short_description;
  const content = post.acf.blog_more_description;
  const dateStr = post.acf.blog_date || post.date;
  const dateFormatted = formatDate(dateStr);

  const heroImageUrl =
    post.acf.blog_image && typeof post.acf.blog_image === "object"
      ? post.acf.blog_image.sizes?.large || post.acf.blog_image.url
      : null;

  // Sidebar posts: all except current
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      {heroImageUrl && (
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden mb-0">
          <Image
            src={heroImageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 max-w-7xl pb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-orange-400 transition-colors text-sm font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="container mx-auto px-6 max-w-7xl py-12">
        {!heroImageUrl && (
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-500 transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* ── Main Article ── */}
          <article className="flex-1 min-w-0">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
              {dateFormatted && (
                <span className="inline-flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  {dateFormatted}
                </span>
              )}
              <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-100">
                Logistics
              </span>
            </div>

            {/* Title (for non-hero case) */}
            {!heroImageUrl && (
              <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}

            {/* Short description */}
            {description && (
              <p className="text-xl text-zinc-500 leading-relaxed border-l-4 border-orange-500 pl-5 mb-8 italic">
                {description}
              </p>
            )}

            {/* Rich content */}
            {content && (
              <div
                className="blog-content prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-p:leading-relaxed prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-800"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}

            {/* Back link footer */}
            <div className="mt-14 pt-8 border-t border-zinc-100">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors shadow-md shadow-orange-200"
              >
                <ArrowLeft className="w-4 h-4" />
                All Articles
              </Link>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:w-80 xl:w-96 flex-shrink-0">
            <BlogSidebar posts={otherPosts} />
          </aside>
        </div>
      </div>
    </div>
  );
}
