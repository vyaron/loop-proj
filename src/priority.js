export function parsePriority(y) {
  if (y == null) {
    return 0;
  }

  const value = Number(y);

  if (!value) {
    return 1;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
