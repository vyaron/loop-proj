export function parsePriority(x) {
  if (x == null) {
    return 0;
  }

  const value = Number(x);

  if (!value) {
    return 1;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
