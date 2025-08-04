"use server";

import { revalidateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const backUrl = process.env.BACKEND_URL;

// Universal POST action
export async function postData({ 
  endpoint, 
  data, 
  tag, 
  revalidateTags, 
  revalidatePaths,
  redirectTo,
  requireAuth = false 
}) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Auth token qo'shish (agar kerak bo'lsa)
    if (requireAuth) {
      const token = await getAuthToken(); // Bu funksiyani keyinroq implement qilasiz
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${backUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Cache revalidation
    if (tag) {
      const tags = Array.isArray(tag) ? tag : [tag];
      tags.forEach(t => revalidateTag(t));
    }

    if (revalidateTags) {
      const tags = Array.isArray(revalidateTags) ? revalidateTags : [revalidateTags];
      tags.forEach(t => revalidateTag(t));
    }

    if (revalidatePaths) {
      const paths = Array.isArray(revalidatePaths) ? revalidatePaths : [revalidatePaths];
      paths.forEach(p => revalidatePath(p));
    }

    // Redirect qilish
    if (redirectTo) {
      redirect(redirectTo);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to post data:", error);
    return { success: false, error: error.message };
  }
}

// PUT action (yangilash uchun)
export async function putData({ 
  endpoint, 
  data, 
  tag, 
  revalidateTags, 
  revalidatePaths,
  redirectTo,
  requireAuth = false 
}) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      const token = await getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${backUrl}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Cache revalidation
    if (tag) {
      const tags = Array.isArray(tag) ? tag : [tag];
      tags.forEach(t => revalidateTag(t));
    }

    if (revalidateTags) {
      const tags = Array.isArray(revalidateTags) ? revalidateTags : [revalidateTags];
      tags.forEach(t => revalidateTag(t));
    }

    if (revalidatePaths) {
      const paths = Array.isArray(revalidatePaths) ? revalidatePaths : [revalidatePaths];
      paths.forEach(p => revalidatePath(p));
    }

    if (redirectTo) {
      redirect(redirectTo);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update data:", error);
    return { success: false, error: error.message };
  }
}

// DELETE action
export async function deleteData({ 
  endpoint, 
  tag, 
  revalidateTags, 
  revalidatePaths,
  redirectTo,
  requireAuth = false 
}) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      const token = await getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${backUrl}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Cache revalidation
    if (tag) {
      const tags = Array.isArray(tag) ? tag : [tag];
      tags.forEach(t => revalidateTag(t));
    }

    if (revalidateTags) {
      const tags = Array.isArray(revalidateTags) ? revalidateTags : [revalidateTags];
      tags.forEach(t => revalidateTag(t));
    }

    if (revalidatePaths) {
      const paths = Array.isArray(revalidatePaths) ? revalidatePaths : [revalidatePaths];
      paths.forEach(p => revalidatePath(p));
    }

    if (redirectTo) {
      redirect(redirectTo);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to delete data:", error);
    return { success: false, error: error.message };
  }
}

// File upload action
export async function uploadFile({ 
  file, 
  multiple = false,
  tag,
  revalidateTags,
  requireAuth = false 
}) {
  try {
    const formData = new FormData();
    
    if (multiple && Array.isArray(file)) {
      file.forEach(f => formData.append('files', f));
    } else {
      formData.append('file', file);
    }

    const headers = {};
    
    if (requireAuth) {
      const token = await getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const endpoint = multiple ? '/api/files/upload-multiple' : '/api/files/upload';
    
    const response = await fetch(`${backUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Upload failed! status: ${response.status}`);
    }

    const result = await response.json();

    // Cache revalidation
    if (tag) {
      const tags = Array.isArray(tag) ? tag : [tag];
      tags.forEach(t => revalidateTag(t));
    }

    if (revalidateTags) {
      const tags = Array.isArray(revalidateTags) ? revalidateTags : [revalidateTags];
      tags.forEach(t => revalidateTag(t));
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to upload file:", error);
    return { success: false, error: error.message };
  }
}

// Auth token olish (implement qilish kerak)
async function getAuthToken() {
  // Bu yerda authentication logic bo'lishi kerak
  // Masalan: cookies'dan yoki session'dan token olish
  const { cookies } = await import('next/headers');
  return cookies().get('auth-token')?.value;
}

// ============ SPECIFIC ACTIONS FOR YOUR MODELS ============

// Admin login action
export async function adminLogin(formData) {
  const name = formData.get('name');
  const password = formData.get('password');

  const result = await postData({
    endpoint: '/api/admin/login',
    data: { name, password }
  });

  if (result.success && result.data.token) {
    // Token'ni cookie'ga saqlash
    const { cookies } = await import('next/headers');
    cookies().set('auth-token', result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 // 7 kun
    });
  }

  return result;
}

// Product actions
export async function createProduct(formData) {
  const productData = {
    name: formData.get('name'),
    ads_title: formData.get('ads_title'),
    description: formData.get('description'),
    guarantee: formData.get('guarantee'),
    serial_number: formData.get('serial_number'),
    category_id: formData.get('category_id'),
    image: formData.getAll('image') // Array uchun
  };

  return await postData({
    endpoint: '/api/products',
    data: productData,
    tag: ['products', 'catalog'],
    revalidatePaths: ['/products', '/admin/products'],
    requireAuth: true
  });
}

export async function updateProduct(id, formData) {
  const productData = {
    name: formData.get('name'),
    ads_title: formData.get('ads_title'),
    description: formData.get('description'),
    guarantee: formData.get('guarantee'),
    serial_number: formData.get('serial_number'),
    category_id: formData.get('category_id'),
    image: formData.getAll('image')
  };

  return await putData({
    endpoint: `/api/products/${id}`,
    data: productData,
    tag: ['products', 'catalog', `product-${id}`],
    revalidatePaths: ['/products', '/admin/products', `/products/${id}`],
    requireAuth: true
  });
}

export async function deleteProduct(id) {
  return await deleteData({
    endpoint: `/api/products/${id}`,
    tag: ['products', 'catalog', `product-${id}`],
    revalidatePaths: ['/products', '/admin/products'],
    requireAuth: true
  });
}

// Category actions
export async function createCategory(formData) {
  const categoryData = {
    name: formData.get('name'),
    image: formData.get('image'),
    top_category_id: formData.get('top_category_id')
  };

  return await postData({
    endpoint: '/api/categories',
    data: categoryData,
    tag: ['categories', 'catalog'],
    revalidatePaths: ['/categories', '/admin/categories'],
    requireAuth: true
  });
}

export async function updateCategory(id, formData) {
  const categoryData = {
    name: formData.get('name'),
    image: formData.get('image'),
    top_category_id: formData.get('top_category_id')
  };

  return await putData({
    endpoint: `/api/categories/${id}`,
    data: categoryData,
    tag: ['categories', 'catalog', `category-${id}`],
    revalidatePaths: ['/categories', '/admin/categories'],
    requireAuth: true
  });
}

// Top Category actions
export async function createTopCategory(formData) {
  const topCategoryData = {
    name: formData.get('name'),
    image: formData.get('image')
  };

  return await postData({
    endpoint: '/api/top-categories',
    data: topCategoryData,
    tag: ['top-categories', 'categories', 'catalog'],
    revalidatePaths: ['/categories', '/admin/categories'],
    requireAuth: true
  });
}

// Order actions
export async function createOrder(formData) {
  const orderData = {
    phone: formData.get('phone'),
    pay_type: formData.get('pay_type'),
    products: JSON.parse(formData.get('products')), // JSON string'dan parse qilish
    client_id: formData.get('client_id')
  };

  return await postData({
    endpoint: '/api/orders',
    data: orderData,
    tag: ['orders'],
    revalidatePaths: ['/admin/orders'],
    redirectTo: '/orders/success'
  });
}

// Review actions
export async function createReview(formData) {
  const reviewData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  return await postData({
    endpoint: '/api/reviews',
    data: reviewData,
    tag: ['reviews'],
    revalidatePaths: ['/reviews', '/admin/reviews']
  });
}

// Client actions
export async function createClient(formData) {
  const clientData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    phone: formData.get('phone'),
    image: formData.get('image'),
    url: formData.get('url')
  };

  return await postData({
    endpoint: '/api/clients',
    data: clientData,
    tag: ['clients'],
    revalidatePaths: ['/admin/clients'],
    requireAuth: true
  });
}
export async function loginUser(formData) {
  try {
    const userData = {
      phone: formData.get('phone'),
      password: formData.get('password')
    };

    const response = await fetch(`${backUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Login failed');
    }

    const result = await response.json();

    // Token'ni cookie'ga saqlash
    if (result.token) {
      cookies().set('user-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60, // 7 kun
        path: '/'
      });
    }

    // Cache revalidation
    revalidateTag('user');
    revalidatePath('/profile');

    return { success: true, data: result };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
}
