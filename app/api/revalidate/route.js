// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // barcha hostlarga ruxsat
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "*",
  // Diqqat: '*' bilan Credentials (cookie/Authorization) ishlamaydi
};

// Preflight (OPTIONS) ga zudlik bilan javob
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  // Agar GET ham kerak bo'lsa: oddiy ping
  return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
}

export async function POST(req) {
  try {
    const { tag, paths } = await req.json();

    const tags = (Array.isArray(tag) ? tag : [tag]).filter(
      (value) => typeof value === "string" && value.trim()
    );
    const requestedPaths = (Array.isArray(paths) ? paths : [paths]).filter(
      (value) => typeof value === "string" && value.startsWith("/")
    );

    if (tags.length === 0 && requestedPaths.length === 0) {
      return NextResponse.json(
        { success: false, error: "Tag is required" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    for (const cacheTag of tags) {
      revalidateTag(cacheTag);
      console.log("Revalidated tag:", cacheTag);
    }

    for (const path of requestedPaths) {
      if (path.includes("[")) {
        revalidatePath(path, "page");
      } else {
        revalidatePath(path);
      }
      console.log("Revalidated path:", path);
    }

    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function DELETE() {
  // Agar DELETE ham kerak bo'lsa (namuna uchun)
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
