/**
 * Parses the input 'n' and returns an integer priority between 0 and 10.
 * Returns 0 for null, undefined, invalid types, empty strings, or NaN.
 * Clamps fractional and out-of-range values to the valid range.
 *
 * @param {string|number|null|undefined} n - The input priority value.
 * @returns {number} An integer priority from 0 to 10.
 */
export function parsePriority(n) {
  if (n == null) return 0;
  if (typeof n !== 'string' && typeof n !== 'number') return 0;

  if (typeof n === 'string') {
    n = n.trim();
    if (n === '') return 0;
  }

  const value = Number(n);
  if (isNaN(value)) return 0;

  return Math.min(10, Math.max(0, Math.floor(value)));
}

// Added test cases
if (typeof describe === 'function') {
  describe('parsePriority', () => {
    it('returns 0 for null or undefined', () => {
      expect(parsePriority(null)).toBe(0);
      expect(parsePriority(undefined)).toBe(0);
    });

    it('returns 0 for invalid types', () => {
      expect(parsePriority({})).toBe(0);
      expect(parsePriority([])).toBe(0);
      expect(parsePriority(() => {})).toBe(0);
      expect(parsePriority(true)).toBe(0);
    });

    it('returns 0 for empty or whitespace-only strings', () => {
      expect(parsePriority('')).toBe(0);
      expect(parsePriority('   ')).toBe(0);
    });

    it('parses valid string and number inputs correctly', () => {
      expect(parsePriority('5')).toBe(5);
      expect(parsePriority(' 7 ')).toBe(7);
      expect(parsePriority(3)).toBe(3);
      expect(parsePriority(9.8)).toBe(9); // floors the value
    });

    it('clamps values below 0 and above 10', () => {
      expect(parsePriority(-2)).toBe(0);
      expect(parsePriority(11)).toBe(10);
      expect(parsePriority('15')).toBe(10);
      expect(parsePriority('-1')).toBe(0);
    });

    it('returns 0 for non-numeric strings', () => {
      expect(parsePriority('abc')).toBe(0);
      expect(parsePriority('123abc')).toBe(0);
    });
  });
}
