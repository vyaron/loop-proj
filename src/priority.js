export function parsePriority(n) {
  // Return default priority 0 if input is null or undefined
  if (n == null) {
    return 0;
  }

  const value = Number(n);

  // If value is not a valid number (NaN), return priority 1 as default for invalid input
  if (isNaN(value)) {
    return 1;
  }

  // Enforce limits: clamp the value between 0 and 10
  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  // Return the valid priority value
  return value;
}
