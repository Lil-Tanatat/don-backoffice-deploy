/**
 * Converts a Buddhist year date string (YYYY-MM-DD) to a Gregorian Date object
 * @param buddhistDateString - Date string in Buddhist year format (e.g., "2567-01-15")
 * @returns Date object in Gregorian calendar or null if invalid
 */
export function convertBuddhistToGregorianDate(
  buddhistDateString: string
): Date | null {
  if (!buddhistDateString) return null;

  const parts = buddhistDateString.split("-");
  if (parts.length !== 3) return null;

  const buddhistYear = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Validate parsed values
  if (isNaN(buddhistYear) || isNaN(month) || isNaN(day)) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  // Convert Buddhist year to Gregorian year
  const gregorianYear = buddhistYear - 543;

  const date = new Date(gregorianYear, month - 1, day);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Converts a Gregorian Date object to Buddhist year date string
 * @param date - Date object in Gregorian calendar
 * @returns Date string in Buddhist year format (YYYY-MM-DD) or empty string if invalid
 */
export function convertGregorianToBuddhistDate(date: Date): string {
  if (!date || isNaN(date.getTime())) return "";

  const buddhistYear = date.getFullYear() + 543;
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${buddhistYear}-${month}-${day}`;
}

/**
 * Converts any date string to Buddhist year format
 * Handles both Gregorian and Buddhist year input formats
 * @param dateString - Date string in any format (YYYY-MM-DD)
 * @returns Date string in Buddhist year format (YYYY-MM-DD) or original string if invalid
 */
export function convertToBuddhistYear(dateString: string): string {
  if (!dateString) return "";

  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Validate parsed values
  if (isNaN(year) || isNaN(month) || isNaN(day)) return dateString;
  if (month < 1 || month > 12) return dateString;
  if (day < 1 || day > 31) return dateString;

  // Check if it's already in Buddhist year format (year > 2500)
  if (year > 2500) {
    return dateString; // Already in Buddhist year format
  }

  // Convert Gregorian year to Buddhist year
  const buddhistYear = year + 543;
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  return `${buddhistYear}-${formattedMonth}-${formattedDay}`;
}
