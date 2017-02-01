import { text, isHidden, property } from 'ember-cli-page-object';

export default {
  scope: '.user-sidebar',

  name: text('h2 .name'),

  twitterHandle: text('li.twitter'),
  twitterHandleHidden: isHidden('li.twitter'),
  twitterLink: property('href', 'li.twitter a'),

  website: text('li.website'),
  websiteHidden: isHidden('li.website'),
  websiteLink: property('href', 'li.website a'),

  username: text('h2 .username')
};
