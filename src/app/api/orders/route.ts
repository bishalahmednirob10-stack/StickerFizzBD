import { NextResponse } from "next/server";

type OrderPayload = {
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
  };
  items: {
    id: string;
    title: string;
    slug: string;
    price: number;
    quantity: number;
    variant?: string;
  }[];
  subtotal: number;
  delivery: number;
  total: number;
  paymentMethod: "cod" | "sslcommerz";
};

export async function POST(request: Request) {
  const order = (await request.json()) as OrderPayload;
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const orderId = `SF-${Date.now()}`;

  if (!scriptUrl) {
    return NextResponse.json(
      {
        ok: false,
        orderId,
        message:
          "Google Apps Script URL is not configured. Add GOOGLE_APPS_SCRIPT_URL after deploying the Sheet script.",
      },
      { status: 503 },
    );
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      orderId,
      createdAt: new Date().toISOString(),
      status: "New",
      ...order,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        orderId,
        message: "Google Sheet order sync failed. Please check the Apps Script deployment.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    orderId,
    message: "Order saved to Google Sheets.",
  });
}
