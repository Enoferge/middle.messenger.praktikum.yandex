export const getPreparedAttrs = (attrs: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== null && value !== ''));
