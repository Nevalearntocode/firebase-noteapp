import { type ClassValue, clsx } from "clsx";
import { format, fromUnixTime } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number) {
  return format(fromUnixTime(timestamp), "yyyy-MM-dd HH:mm:ss");
}

export function onImageUpload(target: EventTarget & HTMLInputElement) {
  const image = target.files ? target.files[0] : undefined;

  if (!image) {
    return;
  }

  return image;
}
