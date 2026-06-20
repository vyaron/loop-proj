export function parsePriority(inp) {
  if (inp == null) {
    return 0;
  }

  const value = Number(inp);

  if (isNaN(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
