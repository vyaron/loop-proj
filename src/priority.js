/**
 * Parses an input value and returns an integer priority between 0 and 10.
 * Null, undefined, or non-numeric inputs yield a priority of 0.
 * Floating-point inputs are floored to the nearest integer.
 *
 * @param {*} x - The input value to parse as priority.
 * @returns {number} An integer priority between 0 (lowest) and 10 (highest).
 */
export function parsePriority(x) {
  if (x == null) {
    // Null or undefined input translates to priority 0
    return 0;
  }

  const value = Number(x);

  // If value is not a valid number (NaN), return 0
  if (Number.isNaN(value)) {
    return 0;
  }

  // Floor the value to get an integer priority
  const intPriority = Math.floor(value);

  // Clamp the value between 0 and 10
  if (intPriority < 0) {
    return 0;
  }

  if (intPriority > 10) {
    return 10;
  }

  return intPriority;
}
