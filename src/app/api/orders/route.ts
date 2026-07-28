import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

type IncomingItem = {
  product_id: string | number;
  quantity: number;
  selected_color?: string | null;
  selected_length?: string | null;
  unit_price: number;
};

type OrderPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zip_code: string;
  items: IncomingItem[];
};

const REQUIRED_FIELDS: (keyof OrderPayload)[] = [
  "first_name",
  "last_name",
  "email",
  "phone",
  "city",
  "state",
  "zip_code",
];

export async function POST(request: Request) {
  let body: OrderPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // --- validate the order header -----------------------------------------
  const missing = REQUIRED_FIELDS.filter(
    (key) => !body[key] || String(body[key]).trim() === ""
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // --- validate the items --------------------------------------------------
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: "Order must include at least one item." },
      { status: 400 }
    );
  }

  for (const item of body.items) {
    if (item.product_id == null || !item.quantity || item.unit_price == null) {
      return NextResponse.json(
        { error: "Each item needs product_id, quantity, and unit_price." },
        { status: 400 }
      );
    }
  }

  const supabase = createServiceClient();

  // --- insert the order header ---------------------------------------------
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      first_name: body.first_name.trim(),
      last_name: body.last_name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      city: body.city.trim(),
      state: body.state.trim(),
      zip_code: body.zip_code.trim(),
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("Failed to create order:", orderError);
    return NextResponse.json(
      { error: orderError?.message ?? "Could not create the order." },
      { status: 500 }
    );
  }

  // --- insert the line items ------------------------------------------------
  const itemRows = body.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    selected_color: item.selected_color ?? null,
    selected_length: item.selected_length ?? null,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(itemRows);

  if (itemsError) {
    console.error("Failed to create order items:", itemsError);
    // Compensating rollback — don't leave a header row with no items behind.
    await supabase.from("orders").delete().eq("id", order.id);

    return NextResponse.json(
      { error: itemsError.message ?? "Could not save the items for this order." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, order_id: order.id }, { status: 200 });
}
