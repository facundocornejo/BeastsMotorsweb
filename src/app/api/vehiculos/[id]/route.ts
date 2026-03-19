import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils/slugify";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();

  // Regenerate slug if key fields changed
  if (body.brand || body.model || body.version !== undefined || body.year) {
    const { data: current } = await supabase
      .from("vehicles")
      .select("brand, model, version, year")
      .eq("id", id)
      .single();

    if (current) {
      const brand = body.brand || current.brand;
      const model = body.model || current.model;
      const version = body.version !== undefined ? body.version : current.version;
      const year = body.year || current.year;

      let slug = slugify(brand, model, version || null, year);

      const { data: existing } = await supabase
        .from("vehicles")
        .select("slug")
        .like("slug", `${slug}%`)
        .neq("id", id);

      if (existing && existing.length > 0) {
        slug = `${slug}-${existing.length + 1}`;
      }

      body.slug = slug;
    }
  }

  const { data, error } = await supabase
    .from("vehicles")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { error } = await supabase
    .from("vehicles")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
