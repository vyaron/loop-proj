/**
 * Parses the input as a priority number.
 *
 * Rules:
 * - null or undefined returns 0
 * - Numeric wrapper objects (e.g. new Number(5)) return their numeric value
 * - Arrays with a single element that can be parsed as a finite number return the parsed value
 * - Strings representing numeric values are parsed to numbers
 * - Non-numeric inputs (empty string, false, symbols, multi-element arrays, objects, functions, NaN, Infinity) return 1
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

  // Unwrap numeric wrapper objects (e.g. new Number(5)) to their primitive value
  if (typeof x === 'object' && x.valueOf && typeof x.valueOf() === 'number') {
    x = x.valueOf();
  }

  // Handle single-element arrays by attempting to parse their single element
  if (Array.isArray(x)) {
    if (x.length === 1) {
      return parsePriority(x[0]);
    } else {
      return 1; // multi-element arrays treated as non-numeric
    }
  }

  let value;

  if (typeof x === 'number') {
    value = x;
  } else if (typeof x === 'string') {
    value = Number(x);
  } else {
    // For all other types (boolean, symbol, function, objects that are not numeric wrappers), return 1
    return 1;
  }

  if (!Number.isFinite(value)) {
    return 1;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}

//# sourceMappingURL=priority.js.map
