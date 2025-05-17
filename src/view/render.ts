import Handlebars from 'handlebars';
import { DefaultLayout } from '../layouts/default';
import { pages } from '../navigation/router';
import type { PageName } from '../navigation/types';

export function renderPage(page: PageName) {
  const { template, cardContext = {}, mountCb } = pages[page];

  const pageHTML = Handlebars.compile(template)(cardContext);
  const fullHTML = Handlebars.compile(DefaultLayout)({ body: pageHTML });

  const root = document.getElementById('app');

  if (root) {
    root.innerHTML = fullHTML;
  }

  if (typeof mountCb === 'function') {
    mountCb();
  }
}
