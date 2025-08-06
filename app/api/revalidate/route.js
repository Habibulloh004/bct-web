// app/api/revalidate/route.js
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { tag } = await req.json();

    if (!tag || (Array.isArray(tag) && tag.length === 0)) {
      return NextResponse.json(
        { success: false, error: "Tag is required" },
        { status: 400 }
      );
    }

    // Handle single tag or array of tags
    if (Array.isArray(tag)) {
      for (const t of tag) {
        await revalidateTag(t);
        console.log("Revalidated:", t);
      }
    } else {
      await revalidateTag(tag);
      console.log("Revalidated:", tag);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
