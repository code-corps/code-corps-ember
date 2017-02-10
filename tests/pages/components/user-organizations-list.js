import {
  count,
  property,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.user-organizations-list',

  header: text('h3'),
  emptyState: text('.empty-state strong'),
  listItemCount: count('li'),
  organizationDescription: text('li:first p'),
  organizationIconSrc: property('src', 'li:first img'),
  organizationTitle: text('li:first h4')
};
