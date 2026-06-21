export function parsePriority(n) {
  // Return default priority 0 if input is null or undefined
  if (n == null) {
    return 0;
  }

  // If input is a string, trim whitespace
  if (typeof n === 'string') {
    n = n.trim();
    // Return 0 immediately if string is empty after trimming
    if (n === '') {
      return 0;
    }
  }

  const value = Number(n);

  // If value is not a valid number (NaN), return default priority 0
  if (isNaN(value)) {
    return 0;
  }

  // Clamp value between 0 and 10
  const clamped = Math.min(Math.max(Math.floor(value), 0), 10);

  // Return integer priority value
  return clamped;
}
