export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as unknown as T;
  }

  const cloned: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = cloneDeep(obj[key]);
    }
  }

  return cloned;
}
