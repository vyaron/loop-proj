export function parsePriority(input) {
  // Return 0 for null or undefined inputs to signify no priority
  if (input == null) {
    return 0;
  }

  // Accept only number or string inputs; reject arrays, objects, functions, etc.
  if (typeof input !== 'number' && typeof input !== 'string') {
    // Default to priority 1 for unsupported input types
    return 1;
  }

  // Additional check: reject inputs that are objects (including arrays) or functions
  // to avoid unexpected numeric coercion (e.g. [5] -> 5).
  // Note: typeof null is 'object' but caught above; this handles arrays and objects.
  if (typeof input === 'object' || Array.isArray(input)) {
    return 1;
  }

  // Convert to number (valid for string or number input)
  const value = Number(input);

  // If conversion results in NaN, return default priority 1
  if (Number.isNaN(value)) {
    return 1;
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
