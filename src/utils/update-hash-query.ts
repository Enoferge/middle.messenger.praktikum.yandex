export function updateHashQuery(param: string, value: string) {
  const [path, query] = window.location.hash.split('?');
  const params = new URLSearchParams(query ?? '');
  params.set(param, value);
  window.location.hash = `${path}?${params.toString()}`;
}
