export function formatTime(isoString: string | null | undefined) {
  if (!isoString) {
    return '';
  }

  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
