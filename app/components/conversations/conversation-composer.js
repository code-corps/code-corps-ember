import Component from '@ember/component';
import { get, set } from '@ember/object';
import { empty } from '@ember/object/computed';

export default Component.extend({
  classNames: ['conversation-composer'],

  body: null,

  submitDisabled: empty('body'),

  send(body) {
    this._unsetBody();
    return get(this, 'onSend')(body).catch(() => this._resetBody(body));
  },

  _resetBody(body) {
    set(this, 'body', body);
  },

  _unsetBody() {
    set(this, 'body', null);
  }
});
