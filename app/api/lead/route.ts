import { NextResponse } from "next/server";

export const runtime = "edge";

type LeadPayload = {
  source: "contact" | "quiz";
  name: string;
  phone: string;
  // Contact form extras
  type?: string;
  bill?: string;
  // Quiz extras
  location?: string;
  goal?: string;
  reason?: string;
  placement?: string;
};

const LABELS: Record<string, Record<string, string>> = {
  type: { home: "Дім", business: "Бізнес", ups: "ДБЖ" },
  location: {
    home: "Приватний будинок",
    cottage: "Дача / котедж",
    business: "Бізнес / офіс",
    industrial: "Виробництво / агро",
  },
  goal: {
    save: "Економія на електриці",
    backup: "Резерв на блекаут",
    both: "Економія + резерв",
    green: "Зелений тариф / прибуток",
  },
  reason: {
    blackouts: "Блекаути та відключення",
    bills: "Високі рахунки",
    independence: "Енергонезалежність",
    eco: "Екологія / ESG",
  },
  placement: {
    roof: "Дах будинку",
    ground: "Окрема ділянка",
    carport: "Навіс / гараж",
    "industrial-roof": "Дах цеху / агро",
  },
};

const label = (group: string, value?: string) =>
  value ? LABELS[group]?.[value] ?? value : undefined;

function buildMessage(p: LeadPayload): string {
  const lines: string[] = [];
  lines.push(
    p.source === "quiz"
      ? "🧮 *Нова заявка з калькулятора*"
      : "📨 *Нова заявка з форми контактів*"
  );
  lines.push("");
  lines.push(`👤 *Ім'я:* ${p.name}`);
  lines.push(`📞 *Телефон:* ${p.phone}`);

  if (p.source === "contact") {
    if (p.type) lines.push(`🎯 *Інтерес:* ${label("type", p.type)}`);
    if (p.bill) lines.push(`💡 *Рахунок:* ${Number(p.bill).toLocaleString("uk-UA")} ₴/міс`);
  } else {
    if (p.location) lines.push(`📍 *Об'єкт:* ${label("location", p.location)}`);
    if (p.goal) lines.push(`🎯 *Мета:* ${label("goal", p.goal)}`);
    if (p.reason) lines.push(`💭 *Причина:* ${label("reason", p.reason)}`);
    if (p.placement) lines.push(`🏗 *Розміщення:* ${label("placement", p.placement)}`);
  }

  lines.push("");
  lines.push(`🕓 ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })}`);
  return lines.join("\n");
}

function isValidPhone(s: string) {
  return s.replace(/\D/g, "").length >= 12;
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[lead] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return NextResponse.json(
      { ok: false, error: "Server not configured" },
      { status: 500 }
    );
  }

  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || body.name.trim().length < 2) {
    return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });
  }
  if (!body.phone || !isValidPhone(body.phone)) {
    return NextResponse.json({ ok: false, error: "Phone invalid" }, { status: 400 });
  }
  if (body.source !== "contact" && body.source !== "quiz") {
    return NextResponse.json({ ok: false, error: "Bad source" }, { status: 400 });
  }

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage(body),
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });

  if (!tgRes.ok) {
    const detail = await tgRes.text();
    console.error("[lead] Telegram error:", tgRes.status, detail);
    return NextResponse.json(
      { ok: false, error: "Telegram send failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
