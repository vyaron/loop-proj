export function parsePriority(n) {
  if (n == null) {
    return 0;
  }

  const value = Number(n);

  if (!value) {
    return 1;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
