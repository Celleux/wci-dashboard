import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combine classNames, dedupe via tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
