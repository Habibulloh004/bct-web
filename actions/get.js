"use server";

const backUrl = process.env.BACKEND_URL;

export async function getData({ endpoint, tag, revalidate }) {
  try {
    // Cache options obyektini yaratish
    const cacheOptions = {};
    
    // Agar revalidate berilgan bo'lsa
    if (revalidate !== undefined) {
      if (revalidate === false) {
        cacheOptions.cache = 'force-cache'; // Doimiy cache
      } else if (revalidate === 0) {
        cacheOptions.cache = 'no-store'; // Cache qilmaslik
      } else if (typeof revalidate === 'number' && revalidate > 0) {
        cacheOptions.next = { revalidate }; // Time-based revalidation
      }
    }
    
    // Agar tag berilgan bo'lsa
    if (tag) {
      if (!cacheOptions.next) {
        cacheOptions.next = {};
      }
      cacheOptions.next.tags = Array.isArray(tag) ? tag : [tag];
    }

    const response = await fetch(`${backUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...cacheOptions
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

// Revalidate qilish uchun yordamchi funksiya
export async function revalidateData(tag) {
  const { revalidateTag } = await import('next/cache');
  
  if (Array.isArray(tag)) {
    tag.forEach(t => revalidateTag(t));
  } else {
    revalidateTag(tag);
  }
}

// Path-based revalidation uchun
export async function revalidatePath(path) {
  const { revalidatePath: nextRevalidatePath } = await import('next/cache');
  nextRevalidatePath(path);
}