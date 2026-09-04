import { notFound } from "next/navigation";
import { getData } from "@/actions/get";
import BlogArticle from "@/components/blog/BlogArticle";
import {
  parseLocalizedBlogField,
  sanitizeLocalizedBlogText,
} from "@/lib/blog-server";
import { createPageMetadata, truncateText } from "@/lib/seo";
import { resolveImageUrl } from "@/lib/utils";

export const revalidate = 3600;

async function getBlog(id) {
  try {
    return await getData({
      endpoint: `/api/blogs/${id}`,
      tag: ["blogs", `blog:${id}`],
      revalidate,
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return createPageMetadata({
      title: "Статья не найдена",
      path: `/blog/${id}`,
    });
  }

  const title = parseLocalizedBlogField(blog.title);
  const text = parseLocalizedBlogField(blog.text);
  const image = parseLocalizedBlogField(blog.image);

  return createPageMetadata({
    title: title.ru || title.en || title.uz,
    description: truncateText(text.ru || text.en || text.uz),
    path: `/blog/${id}`,
    image: resolveImageUrl(image.ru || image.en || image.uz),
  });
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <BlogArticle
      blog={{
        ...blog,
        title: parseLocalizedBlogField(blog.title),
        text: sanitizeLocalizedBlogText(blog.text),
        image: parseLocalizedBlogField(blog.image),
      }}
    />
  );
}
