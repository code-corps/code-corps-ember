import { isVisible, text } from 'ember-cli-page-object';

export default {
  scope: '.show-donation',
  rendersIcon: isVisible('.icon'),
  infoText: text('.info')
};
