import './styles/variables.css';
import './styles/base.css';
import * as Components from './components';
import { DefaultLayout } from './layouts/default';
import Handlebars from 'handlebars';
import { HomePage } from './pages/home';
import { AuthPage } from './pages/auth';
import { prepareForm } from './utils/form';
import type { InputField } from './components/input/types';

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

Handlebars.registerHelper(
  'resolveSlot',
  function (this: { [key: string]: any }, slotName: string, fallback: string) {
    return this[slotName] ?? fallback;
  }
);

const loginFields = [
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

export const registrationFields: Array<InputField> = [
  {
    label: 'First Name',
    name: 'first_name',
    type: 'text',
    placeholder: 'Enter your first name',
  },
  {
    label: 'Second Name',
    name: 'second_name',
    type: 'text',
    placeholder: 'Enter your second name',
  },
  {
    label: 'Login',
    name: 'login',
    type: 'text',
    placeholder: 'Enter your login',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    error: 'Error message',
    placeholder: 'Enter your phone number',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    minlength: 8,
    placeholder: 'Your password',
  },
  {
    label: 'Password confirm',
    name: 'password_confirm',
    type: 'password',
    minlength: 8,
    placeholder: 'Repeat your password',
  },
];

const pages: Record<string, any> = {
  registration: {
    template: AuthPage,
    cardContext: {
      title: 'Registration',
      formFields: registrationFields,
      formId: 'registration-form',
      submitAction: {
        name: 'register',
        text: 'Register',
      },
      secondaryAction: {
        name: 'register',
        text: 'Sign in',
        page: 'login',
      },
    },
    mountCb: () => prepareForm('registration-form', console.log),
  },
  login: {
    template: AuthPage,
    cardContext: {
      title: 'Login',
      formFields: loginFields,
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
    },
    mountCb: () => prepareForm('login-form', console.log),
  },
  home: { template: HomePage },
};

function renderPage(page: string) {
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

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const page = target.dataset.page;

  if (page && pages[page]) {
    e.preventDefault();
    e.stopPropagation();
    renderPage(page);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderPage('registration');
});
