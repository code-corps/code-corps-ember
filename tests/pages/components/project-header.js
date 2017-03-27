import {
  attribute,
  text
} from 'ember-cli-page-object';
import projectJoinModal from 'code-corps-ember/tests/pages/components/project-join-modal';

export default {
  scope: '.project__header',

  icon: {
    scope: '.project__header__icon img',
    src: attribute('src')
  },

  projectJoinModal,

  signUpLink: {
    scope: 'aside a',
    href: attribute('href')
  },

  title: {
    scope: '.project__header__title',
    text: text()
  }
};
