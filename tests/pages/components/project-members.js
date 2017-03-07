import {
  collection,
  count,
  isVisible,
  property
} from 'ember-cli-page-object';

export default {
  scope: '.project-members',

  memberCount: count('li'),

  members: collection({
    itemScope: 'li',
    item: {
      imageSource: property('src', 'img'),
      imageIsVisible: isVisible('img'),
      placeholderIsVisible: isVisible('div.icon')
    }
  })
};
