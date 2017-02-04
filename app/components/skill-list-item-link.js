import Ember from 'ember';

const {
  Component,
  get,
  getProperties,
  set
} = Ember;

export default Component.extend({
  classNameBindings: ['justClicked', 'justRemoved', 'matched'],
  tagName: 'a',

  click() {
    let skill = get(this, 'skill');
    this._toggleClickState();
    get(this, 'toggleSkill')(skill);
  },

  mouseLeave() {
    this._clearClickState();
  },

  _clearClickState() {
    set(this, 'justClicked', false);
    set(this, 'justRemoved', false);
  },

  _toggleClickState() {
    let matched = get(this, 'matched');
    if (matched) {
      set(this, 'justRemoved', true);
    } else {
      set(this, 'justRemoved', false);
    }
    set(this, 'justClicked', true);
  }
});
