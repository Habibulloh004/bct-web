import { getData } from "@/actions/get";
import BlogList from "@/components/blog/BlogList";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "Блог об автоматизации бизнеса",
  description:
    "Статьи Bar Code Technologies об автоматизации Retail, HoReCa, складов и производства в Узбекистане.",
  path: "/blog",
  keywords: ["блог об автоматизации", "автоматизация бизнеса Узбекистан"],
});

export default async function BlogPage() {
  let blogs = [];

  try {
    const response = await getData({
      endpoint: "/api/blogs?page=1&limit=100",
      tag: ["blogs"],
      revalidate,
    });
    blogs = Array.isArray(response?.data) ? response.data : [];
  } catch (error) {
    console.error("Failed to load blogs:", error);
  }

  return <BlogList blogs={blogs} />;
}
