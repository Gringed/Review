import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeText(sequence: any, maxChars: number, transformation = "capitalize") {
  let transformedText = sequence?.length <= maxChars ? sequence : `${sequence?.substring(0, maxChars - 1)}...`
  switch (transformation) {
      case "lowercase":
          return transformedText?.toLowerCase()
      case "uppercase":
          return transformedText?.toUpperCase()
      case "capitalize":
          return transformedText?.substring(0, 1).toUpperCase() + transformedText?.substring(1, transformedText?.length).toLowerCase()
      case "none":
      default:
          return transformedText
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
};