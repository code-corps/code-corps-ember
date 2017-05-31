import {
  clickable, hasClass
} from 'ember-cli-page-object';

export default {
  scope: '.animated-high-five',

  click: clickable(''),
  isFollowOnAnimation: hasClass('follow-on-animation'),
  isInitialAnimation: hasClass('initial-animation')
};
