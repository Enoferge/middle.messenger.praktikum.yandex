export function areSimpleObjectsEqual(
  obj1: Record<string, string | undefined>,
  obj2: Record<string, string | undefined>,
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) { return false; }
  return keys1.every((key) => obj1[key] === obj2[key]);
}
