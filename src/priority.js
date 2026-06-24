/**
 * Parses the input into a priority number between 0 and 10.
 *
 * - Returns 0 if input is null or undefined.
 * - Returns 0 if input cannot be converted to a valid number.
 * - Clamps valid numeric priorities between 1 and 10.
 *
 * @param {*} x - The input priority value.
 * @returns {number} - A priority number between 0 and 10.
 */
export function parsePriority(x) {
  if (x == null) {
    // Null or undefined input yields priority 0
    return 0;
  }

  const value = Number(x);

  // If conversion to number fails (NaN), return 0
  if (Number.isNaN(value)) {
    return 0;
  }

  // Clamp value between 1 and 10
  if (value < 1) {
    return 1;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
