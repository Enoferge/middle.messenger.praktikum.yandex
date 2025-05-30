import { DefaultLayout } from '@/layouts/default';
import type { PageName } from '@/navigation/types';
import { AuthPage } from '@/pages/auth';

export function renderPage(_page: PageName) {
  // test Auth Page
  const page = new AuthPage({});

  const layout = new DefaultLayout({
    hideHomeButton: false,
    PageContent: page,
  });

  const root = document.getElementById('app');
  const layoutContent = layout.getContent();

  if (root && layoutContent) {
    root.appendChild(layoutContent);
    page.dispatchComponentDidMount();
  }
  // const { template, context = {}, layoutContext = {}, mountCb } = pages[page];

  // const pageHTML = Handlebars.compile(template)(context);
  // const fullHTML = Handlebars.compile(DefaultLayout)({ body: pageHTML, ...layoutContext });

  // const root = document.getElementById('app');

  // if (root) {
  //   root.innerHTML = fullHTML;
  // }

  // if (context.formId) {
  //   prepareForm(context.formId, console.log);
  // }
  // if (typeof mountCb === 'function') {
  //   mountCb();
  // }
}
