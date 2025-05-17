import Handlebars from 'handlebars';

export function registerHelpers() {
  Handlebars.registerHelper(
    'resolveSlot',
    function (this: { [key: string]: any }, slotName: string, fallback: string) {
      return this[slotName] ?? fallback;
    }
  );
}
