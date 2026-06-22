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

  // Explicitly check if input is a number or a string that represents a number
  // If x is a number, use it directly
  // If x is a string, try to parse it to a finite number
  // Otherwise, treat as non-numeric input
  let value;
  if (typeof x === 'number') {
    value = x;
  } else if (typeof x === 'string') {
    // Attempt to parse string to number
    value = Number(x);
  } else {
    // For all other types (boolean, symbol, object, function), return 1
    return 1;
  }

  if (!Number.isFinite(value)) {
    // NaN or Infinite values treated as non-numeric
    return 1;
  }

  // Clamp the numeric value between 0 and 10
  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
