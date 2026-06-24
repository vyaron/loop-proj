/**
 * Parses an input value and returns an integer priority between 0 and 10.
 * Null and undefined inputs yield a priority of 0.
 * Non-numeric inputs (including NaN) yield a priority of 0.
 * Numeric strings, including those representing floating-point numbers, are parsed as numbers.
 * Special numeric values like Infinity and -Infinity are clamped appropriately.
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

// Unit tests for parsePriority
if (import.meta.vitest) {
  const { test, expect, describe } = import.meta.vitest;

  describe('parsePriority', () => {
    test('returns 0 for null or undefined', () => {
      expect(parsePriority(null)).toBe(0);
      expect(parsePriority(undefined)).toBe(0);
    });

    test('returns 0 for non-numeric inputs', () => {
      expect(parsePriority('abc')).toBe(0);
      expect(parsePriority({})).toBe(0);
      expect(parsePriority([])).toBe(0); // Number([]) === 0, but floor(0) => 0, acceptable
      expect(parsePriority([1])).toBe(1); // Number([1]) === 1
      expect(parsePriority([1,2])).toBe(0); // Number([1,2]) is NaN
    });

    test('parses numeric strings correctly', () => {
      expect(parsePriority('5')).toBe(5);
      expect(parsePriority('5.7')).toBe(5);
      expect(parsePriority('-3')).toBe(0); // Clamped to 0
    });

    test('handles floating point numbers by flooring', () => {
      expect(parsePriority(3.9)).toBe(3);
      expect(parsePriority(-1.2)).toBe(0);
    });

    test('clamps values below 0 and above 10', () => {
      expect(parsePriority(-10)).toBe(0);
      expect(parsePriority(11)).toBe(10);
      expect(parsePriority(100)).toBe(10);
    });

    test('handles special numeric values', () => {
      expect(parsePriority(Infinity)).toBe(10);
      expect(parsePriority(-Infinity)).toBe(0);
      expect(parsePriority(NaN)).toBe(0);
    });

    test('handles boolean input converted to number', () => {
      expect(parsePriority(true)).toBe(1); // Number(true) === 1
      expect(parsePriority(false)).toBe(0); // Number(false) === 0
    });
  });
}
