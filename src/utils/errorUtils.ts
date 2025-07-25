export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  data: any;
  error?: {
    message: string;
  };
}

export function parseApiError(error: any): string {
  console.log("=== parseApiError function called ===");
  console.log("Full error object:", error);
  console.log("Error response:", error?.response);
  console.log("Error response data:", error?.response?.data);

  // Try to extract error message from various possible locations
  let errorMessage = "";

  // Check if it's an axios error with response data
  if (error?.response?.data) {
    const data = error.response.data;
    errorMessage = data.message || data.error?.message || JSON.stringify(data);
  }
  // Check if it's a direct error with message
  else if (error?.message) {
    errorMessage = error.message;
  }
  // Check if error is already a string
  else if (typeof error === "string") {
    errorMessage = error;
  }

  console.log("Extracted error message:", errorMessage);

  // If no error message found, return default
  if (!errorMessage) {
    return "เกิดข้อผิดพลาดในการลงทะเบียน";
  }

  // TEMPORARY: Force return for testing
  if (errorMessage.includes("422") || errorMessage.includes("email")) {
    console.log("🔧 FORCED RETURN: Email ซ้ำ");
    return "Email ซ้ำ";
  }

  // Convert to lowercase for case-insensitive matching
  const lowerErrorMessage = errorMessage.toLowerCase();

  // Check for email exists error with detailed logging
  console.log("Checking for email error patterns...");
  console.log("Lowercase message:", lowerErrorMessage);
  console.log(
    "Contains 'email_exists'?",
    lowerErrorMessage.includes("email_exists")
  );
  console.log(
    "Contains 'email address has already been registered'?",
    lowerErrorMessage.includes("email address has already been registered")
  );

  if (
    lowerErrorMessage.includes("email_exists") ||
    lowerErrorMessage.includes("email address has already been registered")
  ) {
    console.log("✅ MATCH FOUND! Returning Email ซ้ำ");
    return "Email ซ้ำ";
  }
  console.log("❌ No email pattern matched");

  // Check for username exists error
  if (lowerErrorMessage.includes("username_exists")) {
    return "Username ซ้ำ";
  }

  // Check for tax ID exists error
  if (lowerErrorMessage.includes("tax_id_exists")) {
    return "เลขบัตรประชาชนซ้ำ";
  }

  console.log("No specific error pattern matched, returning original message");
  // Return the original error message if no specific pattern matches
  return errorMessage;
}
