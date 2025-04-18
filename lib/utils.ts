import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as showdown from 'showdown';

var config = {
  extensions: [],
  sanitize: false
};
const converter = new showdown.Converter();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to format date to readable string
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const markDownToHTMLConverter = (markdown: string): string => {
  return converter.makeHtml(markdown);
}
