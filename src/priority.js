export function parsePriority(x) {
  if (x == null) {
    return 0;
  }

  const value = Number(x);

  // Check if the value is a valid number
  if (isNaN(value)) {
    // Treat non-numeric strings and NaN as priority 1
    return 1;
  }

  // Handle zero explicitly: accept zero priority
  if (value === 0) {
    return 0;
  }

  // Clamp priorities below 1 to 1 (minimum positive priority)
  if (value < 1) {
    return 1;
  }

  // Cap the priority at 10
  if (value > 10) {
    return 10;
  }

  return value;
}
