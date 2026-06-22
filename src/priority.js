/**
 * Parses an input to determine a numeric priority between 0 and 10.
 * Priority semantics:
 * - null or undefined inputs return 0 (no priority).
 * - Invalid or negative inputs return 1 (lowest positive priority).
 * - Zero is a valid priority representing the lowest priority.
 * - Priorities above 10 are capped at 10.
 *
 * @param {*} x The input to parse as priority.
 * @returns {number} The parsed priority, guaranteed between 0 and 10.
 */
export function parsePriority(x) {
  if (x == null) {
    // null or undefined inputs have priority 0
    return 0;
  }

  // Reject non-primitive inputs to avoid unexpected conversions (objects, arrays)
  const type = typeof x;
  if (type !== 'string' && type !== 'number' && type !== 'boolean') {
    // Treat all other types as priority 1
    return 1;
  }

  const value = Number(x);

  if (isNaN(value)) {
    // Non-numeric strings and NaN produce priority 1
    return 1;
  }

  if (value < 0) {
    // Negative priorities are invalid, return lowest positive priority 1
    return 1;
  }

  if (value === 0) {
    // Zero is allowed as lowest priority
    return 0;
  }

  if (value > 10) {
    // Cap priority at 10
    return 10;
  }

  // Clamp to minimum 1 for any positive numbers less than 1
  if (value > 0 && value < 1) {
    return 1;
  }

  return value;
}
