import Handlebars from 'handlebars';
import * as Components from '../components';

export function registerPartials() {
  Object.entries(Components).forEach(([name, template]) => {
    Handlebars.registerPartial(name, template);
  });
}
