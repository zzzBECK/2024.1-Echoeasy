import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStringToDate(date: string) {
  try {
    return new Date(date).toLocaleDateString("pt-BR");
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return date;
  }
}
