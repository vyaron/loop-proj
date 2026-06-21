// Parses the priority value with defined constraints:
// - null/undefined returns 0 (no priority)
// - non-numeric or negative inputs return 1 (default minimum priority)
// - caps priority at MAX_PRIORITY (10)
// - accepts numeric inputs between 1 and 10 inclusive
//
// Usage examples:
// parsePriority(null)      // returns 0 (no priority)
// parsePriority(undefined) // returns 0 (no priority)
// parsePriority('5')       // returns 5
// parsePriority('abc')     // returns 1 (minimum priority)
// parsePriority(-3)        // returns 1 (minimum priority)
// parsePriority(15)        // returns 10 (max priority)

const MIN_PRIORITY = 1;
const MAX_PRIORITY = 10;
const NO_PRIORITY = 0;

export function parsePriority(x) {
  if (x == null) {
    // No priority specified
    return NO_PRIORITY;
  }

  const value = Number(x);

  // If value is not a valid number or negative, default to MIN_PRIORITY
  if (isNaN(value) || value < MIN_PRIORITY) {
    return MIN_PRIORITY;
  }

  // Cap the priority at MAX_PRIORITY
  if (value > MAX_PRIORITY) {
    return MAX_PRIORITY;
  }

  return value;
}
