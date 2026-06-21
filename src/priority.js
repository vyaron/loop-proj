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

  // Clamp the value between 0 and 10
  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
