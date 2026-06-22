/**
 * Parses the input as a priority number.
 *
 * Rules:
 * - null or undefined returns 0
 * - Non-numeric inputs (including empty string, false, symbols, objects, NaN) return 1
 * - Numeric values less than 0 are clamped to 0
 * - Numeric values greater than 10 are clamped to 10
 * - Numeric values between 0 and 10 inclusive are returned as is
 *
 * @param {*} x - The input to parse
 * @returns {number} A priority value between 0 and 10
 */
export function parsePriority(x) {
  if (x == null) {
    return 0;
  }

  // Convert to number
  const value = Number(x);

  // If conversion results in NaN or original input is non-numeric (includes falsy non-null, e.g. '', false), return 1
  // Check if original input is a number or a string representing a number
  // Number.isFinite ensures value is a valid finite number
  if (!Number.isFinite(value)) {
    return 1;
  }

  // Clamp value between 0 and 10
  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
