import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type InquiryPayload = {
  contactPerson?: string;
  companyName?: string;
  phone?: string;
  whatsapp?: string;
  city?: string;
  state?: string;
  inquiryType?: string;
  estimatedQty?: string;
  message?: string;
  products?: string[];
};

const REQUIRED_FIELDS: Array<keyof InquiryPayload> = [
  "contactPerson",
  "companyName",
  "phone",
  "city",
  "state",
  "inquiryType",
  "estimatedQty",
];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getMissingFields(payload: InquiryPayload) {
  return REQUIRED_FIELDS.filter((field) => !clean(payload[field]));
}

function buildEmailText(payload: InquiryPayload) {
  const products =
    payload.products && payload.products.length > 0
      ? payload.products.map((product) => `- ${product}`).join("\n")
      : "- All products / catalogue requested";

  return [
    "New Dealer Inquiry - KAG Batteries",
    "",
    `Contact: ${clean(payload.contactPerson)}`,
    `Company: ${clean(payload.companyName)}`,
    `Phone: ${clean(payload.phone)}`,
    payload.whatsapp ? `WhatsApp: ${clean(payload.whatsapp)}` : "",
    `Location: ${clean(payload.city)}, ${clean(payload.state)}`,
    `Inquiry type: ${clean(payload.inquiryType)}`,
    `Estimated monthly quantity: ${clean(payload.estimatedQty)} units/month`,
    "",
    "Products interested in:",
    products,
    "",
    payload.message ? `Message: ${clean(payload.message)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid inquiry payload" }, { status: 400 });
  }

  const missingFields = getMissingFields(payload);
  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", fields: missingFields },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.INQUIRY_TO_EMAIL || "info@kagbatteries.in";
  const from = process.env.INQUIRY_FROM_EMAIL || user;

  if (!host || !user || !pass || !from) {
    return NextResponse.json(
      { error: "Email delivery is not configured" },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `Dealer inquiry: ${clean(payload.companyName)} - ${clean(payload.city)}`;

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text: buildEmailText(payload),
    });

    return NextResponse.json({ ok: true, sentTo: to });
  } catch (error) {
    console.error("Inquiry email failed:", error);
    return NextResponse.json(
      { error: "Inquiry email failed" },
      { status: 502 }
    );
  }
}
