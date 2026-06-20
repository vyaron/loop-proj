/**
 * Parses the input into a priority integer between 0 and 10 inclusive.
 * Returns 0 if input is nullish.
 * Returns 1 if input is not a valid number string or number.
 * Fractional values are floored to the nearest integer.
 * Strings with whitespace are trimmed before parsing.
 * Non-string, non-number inputs return default priority 1.
 * 
 * @param {unknown} inp - the input to parse as a priority value
 * @returns {number} - an integer priority between 0 and 10
 */
export function parsePriority(inp) {
  if (inp == null) {
    return 0;
  }

  // Handle string input with trimming
  if (typeof inp === 'string') {
    const trimmed = inp.trim();
    if (trimmed === '') {
      // Empty or whitespace-only string treated as invalid
      return 1;
    }
    const value = Number(trimmed);
    if (Number.isNaN(value)) {
      return 1;
    }
    // Floor fractional values to integer
    let intValue = Math.floor(value);
    if (intValue < 0) return 0;
    if (intValue > 10) return 10;
    return intValue;
  }

  // Handle number input
  if (typeof inp === 'number') {
    if (Number.isNaN(inp)) {
      return 1;
    }
    let intValue = Math.floor(inp);
    if (intValue < 0) return 0;
    if (intValue > 10) return 10;
    return intValue;
  }

  // For other types (e.g. boolean, object), try coercion cautiously
  // but do not accept empty strings coerced to 0 inadvertently
  // Instead return 1 as default for invalid inputs
  return 1;
}

// Minimal inline tests (can be removed or moved to proper test files)
if (import.meta && import.meta.main) {
  const tests = [
    [null, 0],
    [undefined, 0],
    ['', 1],
    ['  ', 1],
    ['5', 5],
    ['5.7', 5],
    ['-3', 0],
    ['11', 10],
    ['abc', 1],
    [8, 8],
    [8.9, 8],
    [-2, 0],
    [NaN, 1],
    [true, 1],
    [{}, 1],
  ];
  for (const [input, expected] of tests) {
    const result = parsePriority(input);
    if (result !== expected) {
      console.error(`Test failed for input: ${JSON.stringify(input)}; expected ${expected} but got ${result}`);
      process.exit(1);
    }
  }
  console.log('All tests passed');
}
