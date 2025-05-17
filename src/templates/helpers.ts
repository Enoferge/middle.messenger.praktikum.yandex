import Handlebars from 'handlebars';

export function registerHelpers() {
  Handlebars.registerHelper(
    'resolveSlot',
    function (this: { [key: string]: any }, slotName: string, fallback: string) {
      return this[slotName] ?? fallback;
    }
  );

  Handlebars.registerHelper('ifEquals', function (this: any, arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });
}
