"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Check,
  Loader2,
  Home,
  Building2,
  BatteryCharging,
  Send,
  MessageCircle,
  Mail,
  Shield,
  Clock,
  Sparkles,
  Inbox,
} from "lucide-react";
import { COMPANY } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { SectionEyebrow } from "./SectionEyebrow";

const TYPES = [
  { id: "home", label: "Дім", icon: Home },
  { id: "business", label: "Бізнес", icon: Building2 },
  { id: "backup", label: "Резерв", icon: BatteryCharging },
] as const;

const BILL_PRESETS = [1500, 2500, 4000, 6000, 10000];

/* Format raw digits as +380 (XX) XXX-XX-XX */
function formatPhone(value: string): string {
  const raw = value.replace(/\D/g, "");
  let digits = raw;
  if (digits.startsWith("380")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, 9);
  if (digits.length === 0) return "";
  const p1 = digits.slice(0, 2);
  const p2 = digits.slice(2, 5);
  const p3 = digits.slice(5, 7);
  const p4 = digits.slice(7, 9);
  let s = `+380 (${p1}`;
  if (p2) s += `) ${p2}`;
  if (p3) s += `-${p3}`;
  if (p4) s += `-${p4}`;
  return s;
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 12;
}

export function Contact() {
  const [type, setType] = useState<(typeof TYPES)[number]["id"]>("home");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bill, setBill] = useState("");
  const [agree, setAgree] = useState(true);
  const [state, setState] = useState<"idle" | "loading" | "ok">("idle");

  const nameValid = name.trim().length >= 2;
  const phoneValid = isValidPhone(phone);
  const canSubmit = nameValid && phoneValid && agree && state !== "loading";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setState("ok");
  };

  return (
    <section id="contact" className="section-pad">
      <div className="container-x">
        <div className="overflow-hidden rounded-3xl border border-line bg-bg shadow-lift lg:rounded-4xl">
          <div className="grid lg:grid-cols-12">
            {/* ── LEFT: Manager + alternative channels ─────────────── */}
            <div className="relative col-span-12 overflow-hidden bg-leaf-700 p-6 text-bg lg:col-span-5 lg:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sun-400/25 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-leaf-400/25 blur-3xl"
              />

              <div className="relative flex h-full flex-col">
                <Reveal>
                  <SectionEyebrow icon={Inbox} label="Заявка" variant="onDark" />
                  <h2 className="h-display mt-4 text-display-2 font-semibold text-balance text-bg">
                    Передзвонимо за{" "}
                    <span className="text-sun-400">30 хвилин</span>.
                  </h2>
                  <p className="mt-5 max-w-md text-base text-bg/75 text-pretty">
                    Залиште ім'я і номер — інженер зателефонує, поставить кілька
                    питань і дасть орієнтовну ціну вже в першій розмові.
                  </p>
                </Reveal>

                {/* Phone list */}
                <Reveal delay={0.15}>
                  <div className="mt-6 space-y-2">
                    {COMPANY.phones.map((p, i) => (
                      <a
                        key={p}
                        href={`tel:${COMPANY.phonesRaw[i]}`}
                        className="group flex items-center gap-3 rounded-2xl border border-bg/15 bg-bg/[0.04] px-4 py-3 transition-all hover:border-sun-400/50 hover:bg-bg/[0.08]"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-bg/10 text-sun-400">
                          <Phone className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <div className="flex-1">
                          <div className="h-display text-base font-medium text-bg lg:text-lg">
                            {p}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-bg/50">
                            {i === 0 ? "Київстар · головний" : "Vodafone"}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </Reveal>

                {/* Alternative channels */}
                <Reveal delay={0.2}>
                  <div className="mt-6 lg:mt-8">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-bg/55">
                      Або напишіть
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <ChannelBtn
                        href={`https://t.me/${COMPANY.phonesRaw[0].replace("+", "")}`}
                        label="Telegram"
                        icon={Send}
                      />
                      <ChannelBtn
                        href={`viber://chat?number=${COMPANY.phonesRaw[0]}`}
                        label="Viber"
                        icon={MessageCircle}
                      />
                      <ChannelBtn
                        href={`mailto:${COMPANY.email}`}
                        label="Email"
                        icon={Mail}
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* ── RIGHT: Form ──────────────────────────────────────── */}
            <div className="col-span-12 bg-bg p-6 lg:col-span-7 lg:p-12">
              <AnimatePresence mode="wait">
                {state === "ok" ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full min-h-[440px] flex-col items-center justify-center text-center"
                  >
                    {/* Success burst */}
                    <div className="relative">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0, opacity: 0.6 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{
                            duration: 1.4,
                            delay: i * 0.3,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                          className="absolute inset-0 rounded-full border-2 border-leaf-400"
                        />
                      ))}
                      <span className="relative grid h-20 w-20 place-items-center rounded-full bg-leaf-50 text-leaf-600">
                        <motion.svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <motion.path
                            d="M5 12 L10 17 L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          />
                        </motion.svg>
                      </span>
                    </div>

                    <h3 className="h-display mt-7 text-2xl font-semibold lg:text-3xl">
                      Дякуємо, {name.split(" ")[0] || "друже"}!
                    </h3>
                    <p className="mt-3 max-w-sm text-base text-ink-muted">
                      Передзвонимо за номером{" "}
                      <span className="font-semibold text-ink">{phone}</span>{" "}
                      протягом{" "}
                      <span className="font-semibold text-leaf-600">
                        30 хвилин
                      </span>{" "}
                      у робочий час.
                    </p>

                    <div className="mt-8 flex items-center gap-2 rounded-full border border-line bg-bg-warm px-4 py-2 text-xs text-ink-muted">
                      <Clock className="h-3.5 w-3.5 text-leaf-600" />
                      Робочі години: пн–сб, 9:00–19:00
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="space-y-7"
                  >
                    {/* Type */}
                    <Field label="Що вас цікавить" required>
                      <div className="grid grid-cols-3 gap-2">
                        {TYPES.map((t) => {
                          const Icon = t.icon;
                          const isActive = type === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setType(t.id)}
                              className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3.5 text-sm font-medium transition-all ${
                                isActive
                                  ? "border-leaf-600 bg-leaf-50 text-leaf-700"
                                  : "border-line bg-bg text-ink-muted hover:border-ink hover:text-ink"
                              }`}
                            >
                              <Icon
                                className={`h-5 w-5 ${
                                  isActive ? "text-leaf-600" : ""
                                }`}
                                strokeWidth={2}
                              />
                              {t.label}
                            </button>
                          );
                        })}
                      </div>
                    </Field>

                    {/* Name */}
                    <Field
                      label="Як до вас звертатись"
                      htmlFor="c-name"
                      valid={nameValid && name.length > 0}
                      required
                    >
                      <input
                        id="c-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ім'я"
                        autoComplete="given-name"
                        className="h-14 w-full rounded-2xl border border-line bg-bg px-5 text-base outline-none transition-colors focus:border-leaf-600"
                      />
                    </Field>

                    {/* Phone */}
                    <Field
                      label="Телефон"
                      htmlFor="c-phone"
                      valid={phoneValid}
                      hint={
                        phone.length > 0 && !phoneValid
                          ? "Введіть повний номер: +380 (XX) XXX-XX-XX"
                          : undefined
                      }
                      required
                    >
                      <input
                        id="c-phone"
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        placeholder="+380 (__) ___-__-__"
                        autoComplete="tel"
                        className="h-14 w-full rounded-2xl border border-line bg-bg px-5 text-base tabular-nums outline-none transition-colors focus:border-leaf-600"
                      />
                    </Field>

                    {/* Monthly bill — preset chips */}
                    <Field
                      label="Місячний рахунок за світло"
                      hint="Опційно — допоможе підготуватися до дзвінка"
                    >
                      <div className="flex flex-wrap gap-2">
                        {BILL_PRESETS.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() =>
                              setBill(bill === `${p}` ? "" : `${p}`)
                            }
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium tabular-nums transition-all ${
                              bill === `${p}`
                                ? "border-leaf-600 bg-leaf-600 text-bg"
                                : "border-line bg-bg text-ink-muted hover:border-ink hover:text-ink"
                            }`}
                          >
                            {p.toLocaleString("uk-UA")} ₴
                          </button>
                        ))}
                        <input
                          type="text"
                          inputMode="numeric"
                          value={bill}
                          onChange={(e) =>
                            setBill(e.target.value.replace(/\D/g, ""))
                          }
                          placeholder="свій варіант"
                          className="w-28 rounded-full border border-line bg-bg px-3.5 py-1.5 text-xs outline-none transition-colors focus:border-leaf-600"
                        />
                      </div>
                    </Field>

                    {/* GDPR */}
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-bg-warm/40 p-4 text-sm text-ink-muted transition-colors hover:bg-bg-warm/70">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="mt-0.5 h-4 w-4 cursor-pointer accent-leaf-600"
                      />
                      <span>
                        Погоджуюсь на обробку персональних даних. Ваш номер не
                        потрапить третім особам — лише наш інженер для дзвінка.
                      </span>
                    </label>

                    {/* Submit */}
                    <Magnetic strength={6} className="block">
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf-600 px-6 py-4 text-sm font-medium text-bg transition-all hover:bg-leaf-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {state === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Відправляємо…
                          </>
                        ) : (
                          <>
                            Залишити заявку
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                              strokeWidth={2.5}
                            />
                          </>
                        )}
                      </button>
                    </Magnetic>

                    {/* Trust strip */}
                    <ul className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-line pt-5 text-xs text-ink-muted">
                      <li className="flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-leaf-600" />
                        Без спаму
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-leaf-600" />
                        Дзвінок за 30 хв
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-leaf-600" strokeWidth={3} />
                        Безкоштовний прорахунок
                      </li>
                    </ul>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Field wrapper with label, validation indicator, hint ─────────── */
function Field({
  label,
  htmlFor,
  valid,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  valid?: boolean;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-1 text-leaf-600">*</span>}
        </label>
        {valid && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1 text-xs text-leaf-600"
          >
            <Check className="h-3 w-3" strokeWidth={3} />
            гаразд
          </motion.span>
        )}
      </div>
      {children}
      {hint && (
        <p className="mt-2 text-xs text-ink-soft">{hint}</p>
      )}
    </div>
  );
}

/* ── Alternative channel button ───────────────────────────────────── */
function ChannelBtn({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Send;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-bg/15 bg-bg/[0.04] py-3 text-xs font-medium text-bg/80 transition-all hover:border-sun-400/60 hover:bg-bg/[0.1] hover:text-bg"
    >
      <Icon className="h-4 w-4 text-sun-400" strokeWidth={2} />
      {label}
    </a>
  );
}
