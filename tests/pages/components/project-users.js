import {
  collection,
  count,
  isVisible,
  property
} from 'ember-cli-page-object';

export default {
  scope: '.project-users',

  userCount: count('li'),

  users: collection({
    itemScope: 'li',
    item: {
      imageSource: property('src', 'img'),
      imageIsVisible: isVisible('img'),
      placeholderIsVisible: isVisible('div.icon')
    }
  })
};
