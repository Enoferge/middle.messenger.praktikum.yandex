type Indexed<T = unknown> = {
  [key: string]: T;
};

function merge<T extends object = Indexed, U extends object = Indexed>(lhs: T, rhs: U): T & U {
  if (typeof lhs !== 'object' || lhs === null) {
    return rhs as T & U;
  }
  if (typeof rhs !== 'object' || rhs === null) {
    return lhs as T & U;
  }

  // use Indexed<any> here to allow dynamic key access for deep merging.
  const result: Indexed<any> = { ...lhs };
  const lhsObj = lhs as Indexed<any>;
  const rhsObj = rhs as Indexed<any>;

  Object.keys(rhsObj).forEach((key) => {
    const rhsValue = rhsObj[key];
    const lhsValue = lhsObj[key];
    if (
      typeof rhsValue === 'object' && rhsValue !== null && !Array.isArray(rhsValue)
      && typeof lhsValue === 'object' && lhsValue !== null && !Array.isArray(lhsValue)
    ) {
      result[key] = merge(lhsValue, rhsValue);
    } else {
      result[key] = rhsValue;
    }
  });

  return result as T & U;
}

export default merge;
