import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const storeId = process.env.SSLC_STORE_ID;
  const storePassword = process.env.SSLC_STORE_PASSWORD;

  if (!storeId || !storePassword) {
    return NextResponse.json({
      ok: false,
      message:
        "SSLCommerz credentials are not configured yet. Add SSLC_STORE_ID and SSLC_STORE_PASSWORD to enable live payments.",
      received: body,
    });
  }

  return NextResponse.json({
    ok: true,
    message:
      "SSLCommerz credentials detected. Connect sslcommerz-lts session creation here before production launch.",
    paymentMethods: ["bKash", "Nagad", "Visa", "Mastercard"],
  });
}
