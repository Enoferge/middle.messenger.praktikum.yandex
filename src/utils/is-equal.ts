type PlainObject<T = any> = Record<string, T>

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
  const lhsKeys = Object.keys(lhs);
  const rhsKeys = Object.keys(rhs);

  if (lhsKeys.length !== rhsKeys.length) {
    return false;
  }

  return lhsKeys.every((key: string) => {
    const leftValue = lhs[key];
    const rightValue = rhs[key];

    if (isArrayOrObject(leftValue) && isArrayOrObject(rightValue)) {
      return isEqual(leftValue, rightValue);
    }

    return leftValue === rightValue;
  });
}

export default isEqual;
