import './styles/variables.css';
import './styles/base.css';
import './styles/fonts.css';
import './styles/ui';
import { renderPage } from './view/render';
import { isPageName } from './utils/isPageName';
import { registerPartials } from './templates/partials';
import { registerHelpers } from './templates/helpers';
import { pages } from './navigation/router';
import { getCurrentPageNameFromPath } from './utils/getCurrentPageFromPath';

registerPartials();
registerHelpers();

document.addEventListener('click', (e) => {
  const { target } = e;

  if (!(target instanceof HTMLLinkElement)) {
    return;
  }

  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
    e.preventDefault();
    const page = target.getAttribute('href')!.slice(1);
    if (page && isPageName(page) && pages[page]) {
      renderPage(page);
      window.history.pushState(null, '', `/${page}`);
    } else {
      renderPage('404');
      window.history.pushState(null, '', '404');
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderPage(getCurrentPageNameFromPath());
});

window.addEventListener('popstate', () => {
  renderPage(getCurrentPageNameFromPath());
});
