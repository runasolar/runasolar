import { type LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  /** Use `onDark` on sections with dark backgrounds (WhyUs, HowItWorks, Contact-left). */
  variant?: "default" | "onDark";
};

export function SectionEyebrow({ icon: Icon, label, variant = "default" }: Props) {
  const styles =
    variant === "onDark"
      ? "border-bg/15 bg-bg/[0.06] text-sun-400 backdrop-blur-sm"
      : "border-leaf-600/20 bg-leaf-50 text-leaf-700";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${styles}`}
    >
      <span
        className={`grid h-5 w-5 place-items-center rounded-full ${
          variant === "onDark" ? "bg-sun-400/15" : "bg-leaf-600/15"
        }`}
      >
        <Icon className="h-3 w-3" strokeWidth={2.5} />
      </span>
      {label}
    </span>
  );
}
