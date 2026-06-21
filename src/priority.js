/**
 * Parses and normalizes a priority input value.
 *
 * Returns a number between 0 and 10 inclusive.
 * - null or undefined inputs return 0 (lowest priority).
 * - Non-numeric or invalid inputs return 0 (treated as no priority).
 * - Numeric inputs are clamped between 0 and 10.
 *
 * @param {*} a - The input value to parse as priority.
 * @returns {number} Normalized priority value between 0 and 10.
 */
export function parsePriority(a) {
  if (a == null) {
    // Null or undefined provided, default to lowest priority
    return 0;
  }

  const value = Number(a);

  if (Number.isNaN(value)) {
    // Non-numeric input: treat as no priority (return 0)
    return 0;
  }

  if (value < 0) {
    // Clamp values below 0 to 0
    return 0;
  }

  if (value > 10) {
    // Clamp values above 10 to 10
    return 10;
  }

  return value;
}
