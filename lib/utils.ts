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


/**
 * A utility function to handle async operations with try-catch pattern
 * @param promise The promise to be resolved
 * @returns Object with data and error properties
 */
export async function tryCatch<T>(promise: Promise<T>): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error(String(error)) 
    };
  }
} 