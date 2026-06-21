export function parsePriority(n) {
  // Return default priority 0 if input is null or undefined
  if (n == null) {
    return 0;
  }

  // Only strings and numbers are valid inputs; otherwise, return 0
  if (typeof n !== 'string' && typeof n !== 'number') {
    return 0;
  }

  // If input is a string, trim whitespace and return 0 if empty
  if (typeof n === 'string') {
    n = n.trim();
    if (n === '') {
      return 0;
    }
  }

  const value = Number(n);

  // Return 0 if conversion to number is invalid
  if (isNaN(value)) {
    return 0;
  }

  // Clamp and floor value to integer priority between 0 and 10
  return Math.min(Math.max(Math.floor(value), 0), 10);
}
