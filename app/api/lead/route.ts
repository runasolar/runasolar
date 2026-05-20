import { NextResponse } from "next/server";
import { Resend } from "resend";

type LeadPayload = {
  source: "contact" | "quiz";
  name: string;
  phone: string;
  email?: string;
  // Contact form extras
  type?: string;
  bill?: string;
  consumption?: string;
  // Quiz extras
  location?: string;
  goal?: string;
  placement?: string;
};

const LABELS: Record<string, Record<string, string>> = {
  type: { home: "Дім", apartment: "Квартира", business: "Бізнес", ups: "САЖ" },
  location: {
    home: "Приватний будинок",
    business: "Бізнес",
  },
  goal: {
    save: "Економія на електриці",
    backup: "Резерв на блекаут",
    both: "Економія + резерв",
    green: "Зелений тариф / прибуток",
    active: "Активний споживач",
    self: "На власне споживання",
    arbitrage: "Арбітраж на ринку",
  },
  placement: {
    roof: "На даху",
    ground: "На землі",
  },
};

const label = (group: string, value?: string) =>
  value ? LABELS[group]?.[value] ?? value : undefined;

function buildTelegramMessage(p: LeadPayload): string {
  const lines: string[] = [];
  lines.push(
    p.source === "quiz"
      ? "🧮 *Нова заявка з калькулятора*"
      : "📨 *Нова заявка з форми контактів*"
  );
  lines.push("");
  lines.push(`👤 *Ім'я:* ${p.name}`);
  lines.push(`📞 *Телефон:* ${p.phone}`);
  if (p.email) lines.push(`✉️ *Email:* ${p.email}`);

  if (p.source === "contact") {
    if (p.type) lines.push(`🎯 *Інтерес:* ${label("type", p.type)}`);
    if (p.bill)
      lines.push(
        `💡 *Рахунок:* ${Number(p.bill).toLocaleString("uk-UA")} ₴/міс`
      );
    if (p.consumption)
      lines.push(
        `⚡ *Споживання:* ${Number(p.consumption).toLocaleString("uk-UA")} кВт`
      );
  } else {
    if (p.location) lines.push(`📍 *Об'єкт:* ${label("location", p.location)}`);
    if (p.goal) lines.push(`🎯 *Мета:* ${label("goal", p.goal)}`);
    if (p.placement)
      lines.push(`🏗 *Розміщення:* ${label("placement", p.placement)}`);
  }

  lines.push("");
  lines.push(
    `🕓 ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })}`
  );
  return lines.join("\n");
}

function buildClientEmail(p: LeadPayload): { subject: string; html: string; text: string } {
  const firstName = p.name.trim().split(/\s+/)[0];
  const summaryRows: { label: string; value: string }[] = [];

  if (p.source === "contact") {
    if (p.type) summaryRows.push({ label: "Послуга", value: label("type", p.type) ?? "" });
    if (p.bill)
      summaryRows.push({
        label: "Місячний рахунок",
        value: `${Number(p.bill).toLocaleString("uk-UA")} ₴`,
      });
  } else {
    if (p.location)
      summaryRows.push({ label: "Об'єкт", value: label("location", p.location) ?? "" });
    if (p.goal) summaryRows.push({ label: "Мета", value: label("goal", p.goal) ?? "" });
    if (p.placement)
      summaryRows.push({
        label: "Розміщення",
        value: label("placement", p.placement) ?? "",
      });
  }

  const rowsHtml = summaryRows
    .map(
      (r) => `
        <tr>
          <td style="padding:8px 0;color:#5C6660;font-size:13px;">${r.label}</td>
          <td style="padding:8px 0;color:#1A1F1B;font-size:14px;font-weight:500;text-align:right;">${r.value}</td>
        </tr>`
    )
    .join("");

  const subject = `Дякуємо за заявку, ${firstName} — RUNA SOLAR`;

  const html = `<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#F2EDE4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A1F1B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2EDE4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#FAFAF7;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);max-width:560px;">
          <!-- Header -->
          <tr>
            <td style="background:#2E5D3A;padding:32px 36px;">
              <div style="display:inline-block;vertical-align:middle;">
                <div style="display:inline-block;width:36px;height:36px;background:#234935;border-radius:8px;padding:4px;box-sizing:border-box;">
                  <table cellpadding="0" cellspacing="2" style="border-collapse:separate;">
                    <tr><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td></tr>
                    <tr><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td></tr>
                    <tr><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td><td style="width:7px;height:7px;background:#E8B340;border-radius:1px;"></td></tr>
                  </table>
                </div>
                <span style="display:inline-block;margin-left:12px;color:#FAFAF7;font-size:18px;font-weight:700;letter-spacing:-0.3px;vertical-align:14px;">
                  RUNA <span style="color:#E8B340;">SOLAR</span>
                </span>
              </div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 36px 16px;">
              <h1 style="margin:0 0 12px;font-size:26px;font-weight:600;letter-spacing:-0.5px;color:#1A1F1B;">Дякуємо, ${firstName}!</h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:#5C6660;">
                Ми отримали вашу заявку. Інженер передзвонить за номером
                <strong style="color:#1A1F1B;">${p.phone}</strong>
                протягом <strong style="color:#2E5D3A;">30 хвилин</strong> у робочий час,
                підбере параметри станції та надішле точний прорахунок.
              </p>

              ${
                summaryRows.length
                  ? `
              <div style="background:#F2EDE4;border-radius:12px;padding:18px 20px;margin-bottom:24px;">
                <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5C6660;margin-bottom:8px;">Ваша заявка</div>
                <table width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
              </div>`
                  : ""
              }

              <div style="background:#EFF5F0;border-left:3px solid #2E5D3A;padding:14px 18px;border-radius:8px;margin-bottom:24px;">
                <div style="font-size:13px;color:#234935;line-height:1.55;">
                  <strong>Що далі:</strong> інженер уточнить кілька деталей, надішле специфікацію обладнання Tier-1 та ціну під ключ. Без зобов'язань і без води — за 10 хвилин розмови у вас буде повна картина.
                </div>
              </div>

              <div style="font-size:13px;color:#5C6660;line-height:1.6;">
                <strong style="color:#1A1F1B;">Робочий час:</strong> Пн–Сб, 9:00–19:00<br>
                <strong style="color:#1A1F1B;">Телефон:</strong> <a href="tel:+380677919797" style="color:#2E5D3A;text-decoration:none;">+380 67 791 97 97</a><br>
                <strong style="color:#1A1F1B;">Сайт:</strong> <a href="https://runasolar.in.ua" style="color:#2E5D3A;text-decoration:none;">runasolar.in.ua</a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px;border-top:1px solid #E5E0D6;background:#FAFAF7;">
              <div style="font-size:11px;color:#8A938D;line-height:1.6;">
                Це автоматичний лист. Якщо ви не залишали заявку — просто проігноруйте його.<br>
                © ${new Date().getFullYear()} RUNA SOLAR · проспект Миру, 58/3, Хмельницький
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Дякуємо, ${firstName}!

Ми отримали вашу заявку. Інженер передзвонить за номером ${p.phone} протягом 30 хвилин у робочий час, підбере параметри станції та надішле точний прорахунок.

Робочий час: Пн–Сб, 9:00–19:00
Телефон: +380 67 791 97 97
Сайт: https://runasolar.in.ua

© ${new Date().getFullYear()} RUNA SOLAR
проспект Миру, 58/3, Хмельницький`;

  return { subject, html, text };
}

function isValidPhone(s: string) {
  return s.replace(/\D/g, "").length >= 12;
}
function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function sendTelegram(p: LeadPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("Telegram not configured");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramMessage(p),
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
}

async function sendClientEmail(p: LeadPayload): Promise<void> {
  if (!p.email) return; // No email provided — silently skip
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "RUNA SOLAR <noreply@runasolar.in.ua>";
  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY missing — skipping email");
    return;
  }

  const resend = new Resend(apiKey);
  const { subject, html, text } = buildClientEmail(p);
  const result = await resend.emails.send({
    from,
    to: p.email,
    subject,
    html,
    text,
    replyTo: "runasolarua@gmail.com",
  });
  if (result.error) throw new Error(`Resend: ${result.error.message}`);
}

export async function POST(req: Request) {
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
  if (body.email && !isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Email invalid" }, { status: 400 });
  }
  if (body.source !== "contact" && body.source !== "quiz") {
    return NextResponse.json({ ok: false, error: "Bad source" }, { status: 400 });
  }

  // Run both notifications in parallel — Telegram is the source of truth
  // (sales must be notified); client email is best-effort.
  const [tgResult, mailResult] = await Promise.allSettled([
    sendTelegram(body),
    sendClientEmail(body),
  ]);

  if (tgResult.status === "rejected") {
    console.error("[lead] Telegram failed:", tgResult.reason);
    return NextResponse.json(
      { ok: false, error: "Telegram send failed" },
      { status: 502 }
    );
  }
  if (mailResult.status === "rejected") {
    // Email failure shouldn't break the lead flow — log and continue
    console.error("[lead] Email failed:", mailResult.reason);
  }

  return NextResponse.json({
    ok: true,
    emailSent: body.email ? mailResult.status === "fulfilled" : false,
  });
}
