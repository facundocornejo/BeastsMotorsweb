import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { vehicleSchema } from "@/lib/validators/vehicle";
import { slugify } from "@/lib/utils/slugify";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const params = request.nextUrl.searchParams;

  let query = supabase
    .from("vehicles")
    .select("*");

  const type = params.get("type");
  if (type) query = query.eq("vehicle_type", type);

  const brand = params.get("brand");
  if (brand) query = query.eq("brand", brand);

  const minPrice = params.get("min_price");
  if (minPrice) query = query.gte("price_usd", Number(minPrice));

  const maxPrice = params.get("max_price");
  if (maxPrice) query = query.lte("price_usd", Number(maxPrice));

  const minYear = params.get("min_year");
  if (minYear) query = query.gte("year", Number(minYear));

  const maxYear = params.get("max_year");
  if (maxYear) query = query.lte("year", Number(maxYear));

  const search = params.get("search");
  if (search) {
    query = query.or(`brand.ilike.%${search}%,model.ilike.%${search}%`);
  }

  const sort = params.get("sort") || "newest";
  switch (sort) {
    case "price_asc":
      query = query.order("price_usd", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price_usd", { ascending: false });
      break;
    case "year_desc":
      query = query.order("year", { ascending: false });
      break;
    case "year_asc":
      query = query.order("year", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const limit = Number(params.get("limit") || 50);
  const offset = Number(params.get("offset") || 0);
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = vehicleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { brand, model, version, year } = parsed.data;
  let slug = slugify(brand, model, version || null, year);

  // Ensure slug uniqueness
  const { data: existing } = await supabase
    .from("vehicles")
    .select("slug")
    .like("slug", `${slug}%`);

  if (existing && existing.length > 0) {
    slug = `${slug}-${existing.length + 1}`;
  }

  const { data, error } = await supabase
    .from("vehicles")
    .insert({
      ...parsed.data,
      version: parsed.data.version || null,
      description: parsed.data.description || null,
      slug,
      images: body.images || [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
