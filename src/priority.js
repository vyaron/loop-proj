/**
 * Parses the input priority and returns an integer between 0 and 10 inclusive.
 * Non-numeric, null, undefined, or invalid inputs return 0.
 * Decimal numbers are floored to the nearest lower integer.
 * Leading/trailing whitespace is allowed.
 * Strings that do not convert cleanly to numbers return 0.
 * Supports numbers in exponential notation (e.g., '1e2'), leading plus signs, and negative numbers.
 *
 * @param {*} inp - The input priority value.
 * @returns {number} - An integer priority between 0 and 10.
 */
export function parsePriority(inp) {
  if (inp == null) {
    // Null or undefined inputs return 0
    return 0;
  }

  // Allow only primitive types that can meaningfully represent numbers
  const type = typeof inp;
  if (type !== 'number' && type !== 'string') {
    // For objects, symbols, booleans, functions, etc., return 0
    return 0;
  }

  // Convert input to string and trim whitespace
  const str = String(inp).trim();

  /*
   * Regex explanation:
   * ^[-+]?           : Optional leading + or - sign
   * (?:\d+(?:\.\d*)?|\.\d+) : Matches numbers like '123', '123.', '123.45', or '.45'
   * (?:[eE][-+]?\d+)?    : Optional exponential part like 'e10', 'E-2'
   * $                 : End of string
   *
   * This regex ensures the entire trimmed string is a valid numeric literal
   * consistent with JavaScript number literals excluding hexadecimal/octal.
   */
  const numericRegex = /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/;

  if (!numericRegex.test(str)) {
    // String does not strictly represent a number
    return 0;
  }

  const value = Number(str);

  // Check if value is a safe number
  if (isNaN(value) || !isFinite(value)) {
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
