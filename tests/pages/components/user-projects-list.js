import {
  count,
  property,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.user-projects-list',

  header: text('h3'),
  emptyState: text('.empty-state strong'),
  listItemCount: count('li'),
  projectDescription: text('li:first p'),
  projectIconSrc: property('src', 'li:first img'),
  projectTitle: text('li:first h4')
};
