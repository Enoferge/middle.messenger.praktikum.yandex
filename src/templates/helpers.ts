import Handlebars, { type HelperOptions } from 'handlebars';

export function registerHelpers() {
  Handlebars.registerHelper(
    'resolveSlot',
    function (this: { [key: string]: any }, slotName: string, fallback: string) {
      return this[slotName] ?? fallback;
    },
  );

  Handlebars.registerHelper('ifEquals', function (this: any, arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('array', (...args: unknown[]) => args.slice(0, -1));

  Handlebars.registerHelper(
    'ifIn',
    function (this: any, value: unknown, list: unknown[], options: HelperOptions) {
      return Array.isArray(list) && list.includes(value) ? options.fn(this) : options.inverse(this);
    },
  );

  Handlebars.registerHelper('formatTime', (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
}
