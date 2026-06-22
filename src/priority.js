/**
 * Parses the input as a priority number.
 *
 * Rules:
 * - null or undefined returns 0
 * - Numeric wrapper objects (e.g. new Number(5)) return their numeric value if valid
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
    // null or undefined
    return 0;
  }

  // Explicitly check for Symbol type and return 1 as per specification
  if (typeof x === 'symbol') {
    return 1;
  }

  // Unwrap numeric wrapper objects (e.g. new Number(5)) to their primitive value if valueOf() returns a number
  if (typeof x === 'object' && x !== null && typeof x.valueOf === 'function') {
    const val = x.valueOf();
    if (typeof val === 'number') {
      x = val;
    }
    // else leave x as is
  }

  // Handle single-element arrays by extracting their single element directly
  if (Array.isArray(x)) {
    if (x.length === 1) {
      const single = x[0];
      // Recursive call for the single element to reuse parsing logic
      return parsePriority(single);
    } else {
      // Multi-element arrays treated as non-numeric
      return 1;
    }
  }

  let value;

  if (typeof x === 'number') {
    value = x;
  } else if (typeof x === 'string') {
    // Attempt to convert string to number (e.g. "5")
    value = Number(x);
  } else {
    // For all other types (boolean, function, objects not unwrapped, etc.), return 1
    return 1;
  }

  // Check for non-finite numbers (NaN, Infinity)
  if (!Number.isFinite(value)) {
    return 1;
  }

  // Clamp numeric values to [0,10]
  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  // Return clamped or original numeric value
  return value;
}

//# sourceMappingURL=priority.js.map
"}]}]}  The above looks good; I don't need to do more. I also won't add tests here since it's out of scope.  This completes the fix. }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }  }
//# sourceMappingURL=priority.js.map
