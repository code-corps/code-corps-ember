import { isVisible } from 'ember-cli-page-object';

export default {
  scope: '.skill',
  isLoading: isVisible('span')
};
