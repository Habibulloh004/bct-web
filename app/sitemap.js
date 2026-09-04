import { getData } from "@/actions/get";
import { absoluteUrl } from "@/lib/seo";
import { createCategoryPath, createProductPath } from "@/lib/routes";

export const revalidate = 3600;

const staticRoutes = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/all-products", changeFrequency: "daily", priority: 0.9 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.75 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/warranty-check", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

async function safeGetData(options) {
  try {
    return await getData(options);
  } catch {
    return null;
  }
}

function getLastModified(item) {
  const value =
    item?.updated_at ||
    item?.updatedAt ||
    item?.modified_at ||
    item?.modifiedAt ||
    item?.created_at ||
    item?.createdAt;

  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function createEntry({ path, changeFrequency = "weekly", priority = 0.5, lastModified }) {
  const entry = {
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  };

  if (lastModified) {
    entry.lastModified = lastModified;
  }

  return entry;
}

async function getAllProducts() {
  const pageSize = 100;
  const firstPage = await safeGetData({
    endpoint: `/api/products?page=1&limit=${pageSize}`,
    tag: ["products", "top-products", "categories"],
    revalidate,
  });

  const products = Array.isArray(firstPage?.data) ? [...firstPage.data] : [];
  const totalPages = Math.ceil((firstPage?.total ?? products.length) / pageSize);

  if (totalPages <= 1) {
    return products;
  }

  const restResponses = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      safeGetData({
        endpoint: `/api/products?page=${index + 2}&limit=${pageSize}`,
        tag: ["products", "top-products", "categories"],
        revalidate,
      })
    )
  );

  restResponses.forEach((response) => {
    if (Array.isArray(response?.data)) {
      products.push(...response.data);
    }
  });

  return products;
}

async function getAllBlogs() {
  const response = await safeGetData({
    endpoint: "/api/blogs?page=1&limit=100",
    tag: ["blogs"],
    revalidate,
  });

  return Array.isArray(response?.data) ? response.data : [];
}

export default async function sitemap() {
  const [categoriesResponse, products, blogs] = await Promise.all([
    safeGetData({
      endpoint: "/api/categories?page=1&limit=500",
      tag: ["top-categories", "categories"],
      revalidate,
    }),
    getAllProducts(),
    getAllBlogs(),
  ]);

  const categories = Array.isArray(categoriesResponse?.data)
    ? categoriesResponse.data
    : [];

  const routes = [
    ...staticRoutes,
    ...categories
      .filter((category) => category?.id)
      .map((category) => ({
        path: createCategoryPath(category),
        changeFrequency: "weekly",
        priority: 0.8,
        lastModified: getLastModified(category),
      })),
    ...products
      .filter((product) => product?.id && product?.category_id)
      .map((product) => ({
        path: createProductPath(product),
        changeFrequency: "weekly",
        priority: 0.75,
        lastModified: getLastModified(product),
      })),
    ...blogs
      .filter((blog) => blog?.id || blog?._id)
      .map((blog) => ({
        path: `/blog/${blog.id || blog._id}`,
        changeFrequency: "monthly",
        priority: 0.65,
        lastModified: getLastModified(blog),
      })),
  ];

  const uniqueRoutes = new Map();

  routes.forEach((route) => {
    if (!uniqueRoutes.has(route.path)) {
      uniqueRoutes.set(route.path, route);
    }
  });

  return Array.from(uniqueRoutes.values()).map(createEntry);
}
