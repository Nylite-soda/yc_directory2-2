import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatSingularOrPlural(count: number, noun: string) {
  return `${count} ${count > 1 ? noun + "s" : noun}`;
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export function generateUsername(fullName: string) {
  const baseName = fullName.replace(/\s/g, "");

  const randomTwoDigits = Math.floor(Math.random() * 90) + 10;

  return `${baseName}${randomTwoDigits}`;
}
