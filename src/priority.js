export function parsePriority(y) {
  if (y == null) {
    return 0;
  }

  const value = Number(y);

  if (!value) {
    return 1;
  }

  // Unwrap numeric wrapper objects (e.g. new Number(5)) to their primitive value if valueOf() returns a number
  if (typeof x === 'object' && x !== null && typeof x.valueOf === 'function') {
    const val = x.valueOf();
    if (typeof val === 'number') {
      x = val;
    }
    // else leave x as is
  }

  // Handle single-element arrays by extracting their single element directly
  if (Array.isArray(x)) {
    if (x.length === 1) {
      const single = x[0];
      // Recursive call for the single element to reuse parsing logic
      return parsePriority(single);
    } else {
      // Multi-element arrays treated as non-numeric
      return 1;
    }
  }

  let value;

  if (typeof x === 'number') {
    value = x;
  } else if (typeof x === 'string') {
    // Attempt to convert string to number (e.g. "5")
    value = Number(x);
  } else {
    // For all other types (boolean, function, objects not unwrapped, etc.), return 1
    return 1;
  }

  // Check for non-finite numbers (NaN, Infinity)
  if (!Number.isFinite(value)) {
    return 1;
  }

  // Clamp numeric values to [0,10]
  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  // Return clamped or original numeric value
  return value;
}
