export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as unknown as T;
  }

  const cloned: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    (cloned as any)[key] = cloneDeep((obj as any)[key]);
  });

  return cloned as T;
}
