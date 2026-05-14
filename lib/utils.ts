import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGrn(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value));
}
