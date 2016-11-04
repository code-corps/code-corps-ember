import { clickable, isVisible } from 'ember-cli-page-object';

export default {
  scope: '.become-a-donor',
  rendersButton: isVisible('button'),
  clickButton: clickable('button.default')
};
