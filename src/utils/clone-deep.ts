export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as unknown as T;
  }

  const cloned: Record<string, unknown> = {};

  Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
    cloned[key] = cloneDeep(value);
  });

  return cloned as T;
}
