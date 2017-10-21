import {
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.user__skills-list',

  listItems: collection({
    itemScope: '[data-test-user-skills-list-item]'
  })
};
