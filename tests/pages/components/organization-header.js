import {
  hasClass,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.organization-header',

  isExpanded: hasClass('expanded'),

  isVisible: isVisible(),

  title: {
    scope: 'h2',
    text: text()
  }
};
