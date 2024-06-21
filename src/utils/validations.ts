/**
 * Validate email format.
 * For simplicity, this function uses a basic regex check.
 * You may want to enhance this according to your specific email validation requirements.
 * @param email Email address to validate.
 * @returns True if the email is valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  // Basic regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format.
 * This function provides a basic check. Modify according to your specific phone number validation requirements.
 * @param phoneNumber Phone number to validate.
 * @returns True if the phone number is valid, false otherwise.
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Basic check for phone number format (only digits, and optionally hyphens or spaces)
  const phoneRegex = /^\d+[\d\- ]*\d$/;
  return phoneRegex.test(phoneNumber);
}
