export function parsePriority(inp) {
  if (inp == null) {
    return 0;
  }

  const value = Number(inp);

  // If input is not a valid number (NaN), return default priority 1
  if (Number.isNaN(value)) {
    return 1;
  }

  // Enforce lower bound 0
  if (value < 0) {
    return 0;
  }

  // Enforce upper bound 10
  if (value > 10) {
    return 10;
  }

  // Return the numeric value within bounds
  return value;
}
