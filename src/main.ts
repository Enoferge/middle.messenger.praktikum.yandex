import './styles/variables.css';
import './styles/base.css';
import './styles/fonts.css';
import { renderPage } from './view/render';
import { isPageName } from './utils/isPageName';
import { registerPartials } from './templates/partials';
import { registerHelpers } from './templates/helpers';
import { pages } from './navigation/router';
import { PAGE_NAMES } from './navigation/constants';

registerPartials();
registerHelpers();

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const page = target.dataset.page;

  if (page && isPageName(page) && pages[page]) {
    e.preventDefault();
    e.stopPropagation();
    renderPage(page);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderPage(PAGE_NAMES.HOME);
});
