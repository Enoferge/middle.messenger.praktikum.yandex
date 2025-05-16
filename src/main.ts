import './styles/variables.css';
import './styles/base.css';
import * as Components from './components';
import { DefaultLayout } from './layouts/default';
import Handlebars from 'handlebars';
import { HomePage } from './pages/home';

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

const pageHTML = Handlebars.compile(HomePage)({
  buttonText: 'Button text',
  inputContext: {
    name: 'username',
    label: 'Username',
    error: 'error text',
  },
});
const fullHTML = Handlebars.compile(DefaultLayout)({ body: pageHTML });

const root = document.getElementById('app');

if (root) {
  root.innerHTML = fullHTML;
}
