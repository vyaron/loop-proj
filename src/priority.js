/**
 * Parses the input as a priority number.
 *
 * Rules:
 * - null or undefined returns 0
 * - Non-numeric or NaN inputs return 1
 * - Values less than 0 are clamped to 0
 * - Values greater than 10 are clamped to 10
 * - Valid numbers between 0 and 10 inclusive are returned as is
 *
 * @param {*} x - The input to parse
 * @returns {number} A priority value between 0 and 10
 */
export function parsePriority(x) {
  if (x == null) {
    return 0;
  }

  const value = Number(x);

  // Return 1 for NaN or non-truthy numbers except zero
  if (Number.isNaN(value)) {
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
