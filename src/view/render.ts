import Handlebars from 'handlebars';
import { DefaultLayout } from '@/layouts/default';
import { pages } from '@/navigation/router';
import type { PageName } from '@/navigation/types';
import { prepareForm } from '@/utils/form';

export function renderPage(page: PageName) {
  const { template, context = {}, layoutContext = {}, mountCb } = pages[page];

  const pageHTML = Handlebars.compile(template)(context);
  const fullHTML = Handlebars.compile(DefaultLayout)({ body: pageHTML, ...layoutContext });

  const root = document.getElementById('app');

  if (root) {
    root.innerHTML = fullHTML;
  }

  if (context.formId) {
    prepareForm(context.formId, console.log);
  }
  if (typeof mountCb === 'function') {
    mountCb();
  }
}
