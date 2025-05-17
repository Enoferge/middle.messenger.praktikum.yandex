import './styles/variables.css';
import './styles/base.css';
import * as Components from './components';
import { DefaultLayout } from './layouts/default';
import Handlebars from 'handlebars';
import { HomePage } from './pages/home';

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

const fields = [
  {
    label: 'Login',
    name: 'login',
    type: 'text',
    placeholder: 'Enter your login',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    minlength: 8,
    placeholder: 'Your password',
  },
];

const pageHTML = Handlebars.compile(HomePage)({
  title: 'Login',
  formFields: fields,
  formId: 'login-form',
  submitAction: {
    name: 'login',
    text: 'Sign in',
  },
  secondaryAction: {
    name: 'register',
    text: 'Register',
    page: 'registration',
  },
});

const fullHTML = Handlebars.compile(DefaultLayout)({ body: pageHTML });
const root = document.getElementById('app');

if (root) {
  root.innerHTML = fullHTML;
}
