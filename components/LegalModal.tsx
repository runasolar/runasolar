"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { COMPANY } from "@/lib/data";

export type LegalDocKey = "privacy" | "offer";

type Props = {
  open: LegalDocKey | null;
  onClose: () => void;
};

export function LegalModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const doc = CONTENT[open];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto mt-10 flex max-h-[calc(100vh-5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-bg shadow-xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line bg-bg px-6 py-4">
          <h2 id="legal-title" className="text-lg font-semibold text-ink">
            {doc.title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Закрити"
            className="rounded-full p-1.5 text-ink-muted hover:bg-bg-warm hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto px-6 py-5 text-sm leading-relaxed text-ink-muted"
        >
          {doc.body.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h3 key={i} className="mt-5 text-base font-semibold text-ink first:mt-0">
                  {block.text}
                </h3>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="mt-2 list-disc space-y-1 pl-5">
                  {block.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-2 first:mt-0">
                {block.text}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Content ────────────────────────────────────────────────────── */

type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

type Doc = { title: string; body: Block[] };

const CONTENT: Record<LegalDocKey, Doc> = {
  privacy: {
    title: "Політика конфіденційності",
    body: [
      {
        type: "paragraph",
        text: `Ця Політика конфіденційності пояснює, як ${COMPANY.name} ("ми", "Компанія") збирає, використовує та захищає персональні дані користувачів сайту.`,
      },
      { type: "heading", text: "1. Які дані ми збираємо" },
      {
        type: "list",
        items: [
          "Ім'я та контактний номер телефону — якщо ви залишаєте заявку.",
          "Електронна адреса — якщо ви надсилаєте її добровільно.",
          "Технічні дані (IP-адреса, тип браузера, час відвідування) — для аналітики сайту.",
        ],
      },
      { type: "heading", text: "2. Мета обробки даних" },
      {
        type: "list",
        items: [
          "Зв'язок з вами після заявки — консультація, прорахунок, виїзд інженера.",
          "Виконання договірних зобов'язань щодо монтажу та сервісу сонячної станції.",
          "Покращення сайту та якості наших послуг.",
        ],
      },
      { type: "heading", text: "3. Зберігання та захист" },
      {
        type: "paragraph",
        text: "Ми зберігаємо ваші дані лише стільки часу, скільки потрібно для зазначених цілей. Доступ до даних мають лише уповноважені працівники Компанії. Ми застосовуємо технічні та організаційні заходи для захисту від несанкціонованого доступу.",
      },
      { type: "heading", text: "4. Передача третім сторонам" },
      {
        type: "paragraph",
        text: "Ми не передаємо ваші персональні дані третім сторонам, окрім випадків: (а) на ваш явний запит; (б) на вимогу законодавства України; (в) сервісним підрядникам, що допомагають надавати послуги (наприклад, постачальникам обладнання).",
      },
      { type: "heading", text: "5. Ваші права" },
      {
        type: "list",
        items: [
          "Отримати інформацію про обробку ваших даних.",
          "Вимагати виправлення неточних даних.",
          "Відкликати згоду на обробку та вимагати видалення даних.",
        ],
      },
      { type: "heading", text: "6. Контакти" },
      {
        type: "paragraph",
        text: `З питань обробки персональних даних звертайтесь: ${COMPANY.email}, ${COMPANY.phones[0]}.`,
      },
    ],
  },
  offer: {
    title: "Публічна оферта",
    body: [
      {
        type: "paragraph",
        text: `Цей документ є офіційною публічною пропозицією ${COMPANY.name} (надалі — "Виконавець") укласти договір про надання послуг з монтажу сонячних електростанцій з будь-якою фізичною або юридичною особою (надалі — "Замовник").`,
      },
      { type: "heading", text: "1. Загальні положення" },
      {
        type: "paragraph",
        text: "Залишення заявки на сайті, дзвінок або письмове звернення до Виконавця прирівнюється до акцепту цієї оферти. Договір вважається укладеним з моменту підписання Сторонами окремого договору або підтвердження умов електронною поштою.",
      },
      { type: "heading", text: "2. Предмет договору" },
      {
        type: "paragraph",
        text: "Виконавець надає консультаційні послуги, виконує технічний аудит, проектування, монтаж та підключення сонячної електростанції згідно з обраною Замовником конфігурацією.",
      },
      { type: "heading", text: "3. Ціни та оплата" },
      {
        type: "list",
        items: [
          "Орієнтовна ціна формується після виїзду інженера на об'єкт.",
          "Остаточна вартість фіксується в окремому договорі та залежить від обладнання і складності монтажу.",
          "Оплата здійснюється у гривнях на рахунок Виконавця згідно з умовами договору (зазвичай — поетапно).",
        ],
      },
      { type: "heading", text: "4. Гарантії" },
      {
        type: "list",
        items: [
          "Tier-1 панелі: гарантія виробника 25 років стабільної генерації.",
          "Гібридний інвертор: 5–10 років гарантії від виробника.",
          "Акумулятор LiFePO4: 10 років гарантії виробника.",
          "Монтажні роботи Виконавця: 2 роки гарантії якості.",
        ],
      },
      { type: "heading", text: "5. Відповідальність сторін" },
      {
        type: "paragraph",
        text: "Сторони несуть відповідальність згідно з чинним законодавством України. Виконавець не несе відповідальності за зниження генерації, спричинене зовнішніми факторами (затінення, забруднення панелей, аварії в мережі обленерго).",
      },
      { type: "heading", text: "6. Форс-мажор" },
      {
        type: "paragraph",
        text: "Сторони звільняються від відповідальності за невиконання зобов'язань, якщо це зумовлено обставинами непереборної сили: бойові дії, відключення електроенергії, зміни в законодавстві тощо.",
      },
      { type: "heading", text: "7. Контакти" },
      {
        type: "paragraph",
        text: `${COMPANY.name} · ${COMPANY.email} · ${COMPANY.phones[0]}`,
      },
    ],
  },
};
