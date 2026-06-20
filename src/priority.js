export function parsePriority(input) {
  if (input == null) {
    return 0;
  }

  const value = Number(input);

  if (!value) {
    return 1;
  }

  if (value > 10) {
    return 10;
  }

  return value;
}
