import Component from '@ember/component';
import { empty } from '@ember/object/computed';

export default Component.extend({
  classNames: ['conversation-composer'],

  body: null,

  submitDisabled: empty('body')
});
