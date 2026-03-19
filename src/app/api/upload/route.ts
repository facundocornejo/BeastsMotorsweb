import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = formData.get("folder") as string || "vehicles";

  if (!file) {
    return NextResponse.json({ error: "No se envió archivo" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const cloudinaryFolder = `beast-motors/${folder}`;
  const paramsToSign = `folder=${cloudinaryFolder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + API_SECRET)
    .digest("hex");

  const uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("api_key", API_KEY);
  uploadForm.append("timestamp", timestamp);
  uploadForm.append("signature", signature);
  uploadForm.append("folder", cloudinaryFolder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: uploadForm }
  );

  if (!res.ok) {
    const errBody = await res.text();
    return NextResponse.json(
      { error: "Error al subir imagen", details: errBody },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json({
    url: data.secure_url,
    public_id: data.public_id,
  });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { public_id } = await request.json();
  if (!public_id) {
    return NextResponse.json({ error: "public_id requerido" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = `public_id=${public_id}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + API_SECRET)
    .digest("hex");

  await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      public_id,
      api_key: API_KEY,
      timestamp,
      signature,
    }),
  });

  return NextResponse.json({ ok: true });
}
