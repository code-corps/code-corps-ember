import {
  attribute,
  hasClass
} from 'ember-cli-page-object';

export default {
  scope: '.project-menu',

  aboutLink: {
    scope    : 'li:eq(0) a',
    href     : attribute('href'),
    isActive : hasClass('active')
  },
  tasksLink: {
    scope    : 'li:eq(1) a',
    href     : attribute('href'),
    isActive : hasClass('active')
  }
};
