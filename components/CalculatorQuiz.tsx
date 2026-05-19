"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Building,
  TrendingDown,
  ShieldCheck,
  Sparkles,
  Leaf,
  ArrowRightLeft,
  Construction,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Calculator as CalculatorIcon,
  Phone,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { COMPANY } from "@/lib/data";
import { trackEvent } from "./Analytics";

type StepId = "location" | "goal" | "placement" | "form";

const STEPS: { id: StepId; question: string; subtitle?: string }[] = [
  {
    id: "location",
    question: "Де ви плануєте використовувати сонячну електростанцію?",
    subtitle: "Це впливає на потужність, тип станції та документи",
  },
  {
    id: "goal",
    question: "Яка ваша основна мета встановлення?",
    subtitle: "Допоможе підібрати між мережевою станцією, гібридом і САЖ",
  },
  {
    id: "placement",
    question: "Де плануєте розмістити сонячні модулі?",
    subtitle: "Від цього залежить кріплення, орієнтація та потужність",
  },
  {
    id: "form",
    question: "Інженер зателефонує за 30 хвилин з готовою специфікацією",
  },
];

type OptionItem = { id: string; label: string; icon: typeof Home };

const LOCATION_OPTIONS: OptionItem[] = [
  { id: "home", label: "Приватний будинок", icon: Home },
  { id: "business", label: "Бізнес", icon: Building },
];

const GOAL_HOME: OptionItem[] = [
  { id: "save", label: "Економія на електриці", icon: TrendingDown },
  { id: "backup", label: "Резерв на блекаут", icon: ShieldCheck },
  { id: "both", label: "Економія + резерв", icon: Sparkles },
  { id: "green", label: "Зелений тариф / прибуток", icon: Leaf },
];

const GOAL_BUSINESS: OptionItem[] = [
  { id: "save", label: "Економія на електриці", icon: TrendingDown },
  { id: "backup", label: "Резерв на блекаут", icon: ShieldCheck },
  { id: "both", label: "Економія + резерв", icon: Sparkles },
  { id: "active", label: "Активний споживач", icon: ArrowRightLeft },
];

const PLACEMENT_OPTIONS: OptionItem[] = [
  { id: "roof", label: "На даху", icon: Home },
  { id: "ground", label: "На землі", icon: Construction },
];

function getOptions(stepId: StepId, answers: Answers): OptionItem[] {
  if (stepId === "location") return LOCATION_OPTIONS;
  if (stepId === "goal") {
    return answers.location === "business" ? GOAL_BUSINESS : GOAL_HOME;
  }
  if (stepId === "placement") return PLACEMENT_OPTIONS;
  return [];
}

type Answers = {
  location?: string;
  goal?: string;
  placement?: string;
};

const TARIFF = 4.32;

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
const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 12;

export function CalculatorQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const total = STEPS.length;
  const current = STEPS[step];

  const emailValid = email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canAdvance = useMemo(() => {
    if (current.id === "form") {
      return name.trim().length >= 2 && isValidPhone(phone) && emailValid;
    }
    return Boolean(answers[current.id as keyof Answers]);
  }, [current, answers, name, phone, emailValid]);

  // Track auto-advance timer so it can be cancelled by manual navigation.
  // Without this, a stale setTimeout from a previous option click can fire
  // after the user clicks "Назад" and push them past where they wanted to be.
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearPendingAdvance = useCallback(() => {
    if (advanceTimer.current !== null) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);
  useEffect(() => clearPendingAdvance, [clearPendingAdvance]);

  const next = () => {
    clearPendingAdvance();
    if (!canAdvance) return;
    if (step < total - 1) setStep(step + 1);
  };
  const prev = () => {
    clearPendingAdvance();
    if (step > 0) setStep(step - 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAdvance) return;
    setState("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "quiz",
          name: name.trim(),
          phone,
          email: email.trim() || undefined,
          location: answers.location,
          goal: answers.goal,
          placement: answers.placement,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Network error");
      }
      setState("ok");
      trackEvent("lead_submit", {
        source: "quiz",
        location: answers.location,
        goal: answers.goal,
      });
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Не вдалося надіслати");
      trackEvent("lead_submit_failed", { source: "quiz" });
    }
  };

  const progress = ((step + (state === "ok" ? 1 : 0)) / total) * 100;

  return (
    <section id="calculator" className="section-pad bg-bg-warm/40">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="04 / 04"
            eyebrowIcon={CalculatorIcon}
            eyebrowLabel="Розрахунок станції"
            title="Підберемо станцію під ваш обʼєкт."
            description="Кілька питань про обʼєкт — інженер передзвонить з орієнтовною ціною, потужністю та строками монтажу."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-bg shadow-soft lg:mt-14">
            {/* Progress bar */}
            <div className="relative">
              <div className="h-1.5 w-full bg-bg-warm">
                <motion.div
                  className="h-full bg-leaf-600"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="flex items-center justify-between px-6 py-4 text-xs lg:px-8">
                <div className="flex items-center gap-2 text-ink-soft">
                  <span className="text-[10px] uppercase tracking-[0.18em]">
                    Етап
                  </span>
                  <span className="h-display text-sm font-semibold tabular-nums text-ink">
                    {String(state === "ok" ? total : step + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Step content */}
            <div className="p-6 lg:p-12">
              {state === "ok" ? (
                <SuccessScreen name={name} phone={phone} />
              ) : (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-leaf-600">
                      Етап {step + 1}
                    </div>
                    <h3 className="h-display mt-3 text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
                      {current.question}
                    </h3>
                    {current.subtitle && (
                      <p className="mt-2 max-w-2xl text-sm text-ink-muted lg:text-base">
                        {current.subtitle}
                      </p>
                    )}

                    <div className="mt-8 lg:mt-10">
                      {current.id === "form" ? (
                        <FormStep
                          name={name}
                          phone={phone}
                          email={email}
                          emailValid={emailValid}
                          onName={setName}
                          onPhone={(v) => setPhone(formatPhone(v))}
                          onEmail={setEmail}
                          onBack={prev}
                          state={state}
                          errorMsg={errorMsg}
                          onSubmit={submit}
                        />
                      ) : (
                        <OptionsGrid
                          options={getOptions(current.id, answers)}
                          value={answers[current.id as keyof Answers]}
                          onChange={(val) => {
                            setAnswers((a) => ({
                              ...a,
                              [current.id]: val,
                            }));
                            // Auto-advance with a short delay for visual
                            // feedback. Cancel any pending advance so a stale
                            // timer from a previous step can't fire and push
                            // past manual back/next navigation.
                            clearPendingAdvance();
                            advanceTimer.current = setTimeout(() => {
                              advanceTimer.current = null;
                              setStep((s) => (s < total - 1 ? s + 1 : s));
                            }, 350);
                          }}
                        />
                      )}
                    </div>

                    {/* Nav buttons (only Next — Back is in header strip) */}
                    {current.id !== "form" && (
                      <div
                        className={`mt-8 flex items-center gap-3 ${
                          step > 0 ? "justify-between" : "justify-end"
                        }`}
                      >
                        {step > 0 && (
                          <button
                            type="button"
                            onClick={prev}
                            className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg px-6 py-3 text-sm font-medium text-ink transition-all hover:border-ink hover:bg-bg-warm"
                          >
                            <ArrowLeft
                              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                              strokeWidth={2.5}
                            />
                            Назад
                          </button>
                        )}
                        <button
                          onClick={next}
                          disabled={!canAdvance}
                          className="group inline-flex items-center gap-2 rounded-full bg-leaf-600 px-6 py-3 text-sm font-medium text-bg transition-all hover:bg-leaf-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Далі
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            strokeWidth={2.5}
                          />
                        </button>
                      </div>
                    )}
                </motion.div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-5 text-center text-xs text-ink-soft lg:mt-6">
            * Орієнтовний прорахунок. Точну ціну дамо після безкоштовного виїзду
            інженера.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Options grid (steps 1-4) ─────────────────────────────────────── */
function OptionsGrid({
  options,
  value,
  onChange,
}: {
  options: readonly { id: string; label: string; icon: typeof Home }[];
  value?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
              active
                ? "border-leaf-600 bg-leaf-50 shadow-soft"
                : "border-line bg-bg hover:border-ink hover:bg-bg-warm/40"
            }`}
          >
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors ${
                active
                  ? "bg-leaf-600 text-bg"
                  : "bg-bg-warm text-ink-muted group-hover:bg-ink group-hover:text-bg"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span
              className={`text-base font-medium ${
                active ? "text-leaf-700" : "text-ink"
              }`}
            >
              {opt.label}
            </span>
            {active && (
              <motion.span
                layoutId="active-check"
                className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-leaf-600 text-bg"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </motion.span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── Final step: contact form ─────────────────────────────────────── */
function FormStep({
  name,
  phone,
  email,
  emailValid,
  onName,
  onPhone,
  onEmail,
  onBack,
  state,
  errorMsg,
  onSubmit,
}: {
  name: string;
  phone: string;
  email: string;
  emailValid: boolean;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onEmail: (v: string) => void;
  onBack: () => void;
  state: "idle" | "loading" | "ok" | "error";
  errorMsg: string | null;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="q-name" className="text-sm font-medium text-ink">
          Як до вас звертатись
        </label>
        <input
          id="q-name"
          required
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Ім'я"
          autoComplete="given-name"
          className="mt-2 h-14 w-full rounded-2xl border border-line bg-bg px-5 text-base outline-none transition-colors focus:border-leaf-600"
        />
      </div>

      <div>
        <label htmlFor="q-phone" className="text-sm font-medium text-ink">
          Телефон
        </label>
        <input
          id="q-phone"
          required
          type="tel"
          value={phone}
          onChange={(e) => onPhone(e.target.value)}
          placeholder="+380 (__) ___-__-__"
          autoComplete="tel"
          className="mt-2 h-14 w-full rounded-2xl border border-line bg-bg px-5 text-base tabular-nums outline-none transition-colors focus:border-leaf-600"
        />
      </div>

      <div>
        <label htmlFor="q-email" className="text-sm font-medium text-ink">
          Email{" "}
          <span className="text-ink-soft">(необов'язково)</span>
        </label>
        <input
          id="q-email"
          type="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          placeholder="ім'я@приклад.ua"
          autoComplete="email"
          className="mt-2 h-14 w-full rounded-2xl border border-line bg-bg px-5 text-base outline-none transition-colors focus:border-leaf-600"
        />
        {email.length > 0 && !emailValid && (
          <p className="mt-2 text-xs text-red-600">
            Перевірте формат: name@domain.com
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg px-6 py-3 text-sm font-medium text-ink transition-all hover:border-ink hover:bg-bg-warm"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={2.5}
          />
          Назад
        </button>
        <button
          type="submit"
          disabled={state === "loading"}
          className="group inline-flex items-center gap-2 rounded-full bg-leaf-600 px-6 py-3 text-sm font-medium text-bg transition-all hover:bg-leaf-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Відправляємо…
            </>
          ) : (
            <>
              Отримати прорахунок
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </>
          )}
        </button>
      </div>

      {state === "error" && (
        <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          Не вдалося надіслати заявку. Зателефонуйте нам — {COMPANY.phones[0]}
          {errorMsg && (
            <span className="ml-1 text-xs text-red-500">({errorMsg})</span>
          )}
        </div>
      )}

      <p className="text-center text-xs text-ink-soft">
        Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
      </p>
    </form>
  );
}

/* ── Success screen ───────────────────────────────────────────────── */
function SuccessScreen({ name, phone }: { name: string; phone: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center py-8 text-center"
    >
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
      <p className="mt-3 max-w-md text-base text-ink-muted">
        Передзвонимо за номером{" "}
        <span className="font-semibold text-ink">{phone}</span> протягом{" "}
        <span className="font-semibold text-leaf-600">30 хвилин</span> з готовим
        прорахунком.
      </p>

      <a
        href={`tel:${COMPANY.phonesRaw[0]}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:bg-bg-warm"
      >
        <Phone className="h-4 w-4 text-leaf-600" />
        Або зателефонувати самостійно
      </a>
    </motion.div>
  );
}
