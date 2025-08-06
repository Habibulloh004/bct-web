"use server";

import { revalidateTag, revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
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
export async function registerUser(formData) {
  try {
    const registerData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    phone: formData.get('phone'),
  };

    const response = await fetch(`${backUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Login failed');
    }

    const result = await response.json();
       // Token'ni cookie'ga saqlash
    if (result.token) {
      cookies().set('auth-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60, // 7 kun
        path: '/'
      });
    }
    revalidateTag('register');
    revalidatePath('/profile');

    return { success: true, data: result };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
}

