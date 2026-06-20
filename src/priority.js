export function parsePriority(input) {
  // Return 0 for null or undefined inputs to signify no priority
  if (input == null) {
    return 0;
  }

  // Accept only number or string inputs
  if (typeof input !== 'number' && typeof input !== 'string') {
    // For unsupported types (objects, arrays, functions), return 0
    return 0;
  }

  // Convert to number (valid for string or number input)
  const value = Number(input);

  // If conversion results in NaN, return 0
  if (Number.isNaN(value)) {
    return 0;
  }

  // Floor any decimal values to get integer priority
  const intValue = Math.floor(value);

  // Clamp the priority between 0 and 10 inclusive
  if (intValue < 0) {
    return 0;
  }

  if (intValue > 10) {
    return 10;
  }

  return intValue;
}
