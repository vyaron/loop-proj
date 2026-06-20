export function parsePriority(input) {
  if (input == null) {
    // Null or undefined inputs receive priority 0
    return 0;
  }

  // Accept only string or number inputs explicitly
  if (typeof input !== 'string' && typeof input !== 'number') {
    return 1; // Default priority for unsupported input types
  }

  // Convert to number (for strings or numbers)
  const value = Number(input);

  if (Number.isNaN(value)) {
    return 1; // Default priority for invalid numeric inputs
  }

  // Ensure integer priority by flooring any decimal values
  const intValue = Math.floor(value);

  // Clamp value between 0 and 10
  if (intValue < 0) {
    return 0;
  }

  if (intValue > 10) {
    return 10;
  }

  return intValue;
}
