import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string from ISO format (YYYY-MM-DDTHH:mm:ss) to Thai format (dd/mm/yyyy)
 * @param dateString - Date string in ISO format or YYYY-MM-DD format
 * @returns Formatted date string in dd/mm/yyyy format
 */
export function formatThaiDate(dateString: string): string {
  if (!dateString) return "";
  
  try {
    // Handle both ISO format (2530-07-17T00:00:00) and simple format (2530-07-17)
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.warn("Error formatting date:", error);
    return dateString; // Return original if error
  }
}


