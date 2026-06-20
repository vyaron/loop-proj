/**
 * Parses the input priority and returns an integer between 0 and 10 inclusive.
 * Non-numeric, null, undefined, or invalid inputs return 0.
 * Decimal numbers are floored to the nearest lower integer.
 * Leading/trailing whitespace is allowed.
 * Strings that do not convert cleanly to numbers return 0.
 *
 * @param {*} inp - The input priority value.
 * @returns {number} - An integer priority between 0 and 10.
 */
export function parsePriority(inp) {
  if (inp == null) {
    return 0;
  }

  // Convert input to string and trim whitespace
  const str = String(inp).trim();

  // Check if the trimmed string matches a valid integer or decimal number pattern
  // This avoids partial parsing like '7abc' => 7
  if (!/^[-+]?\d+(\.\d+)?$/.test(str)) {
    return 0;
  }

  const value = Number(str);

  if (isNaN(value)) {
    return 0;
  }

  // Floor decimal values to enforce integer priorities
  const intValue = Math.floor(value);

  if (intValue < 0) {
    return 0;
  }

  if (intValue > 10) {
    return 10;
  }

  return intValue;
}
