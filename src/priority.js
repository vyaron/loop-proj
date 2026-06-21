export function parsePriority(a) {
  if (a == null) {
    return 0;
  }

  const value = Number(a);

  if (Number.isNaN(value)) {
    return 1;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
