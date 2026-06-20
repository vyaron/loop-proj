export function parsePriority(input) {
  if (input == null) {
    return 0;
  }

  const value = Number(input);

  if (Number.isNaN(value)) {
    return 1; // Default priority for invalid input
  }

  // Clamp value between 0 and 10
  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
