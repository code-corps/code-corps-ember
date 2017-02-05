import Ember from 'ember';

const {
  Component,
  get,
  inject: { service },
  set
} = Ember;

/**
  This component is used to add or remove a user's skill when authenticated
  and show the state of the user's skill, or login when unauthenticated.

  ## default usage

  ```Handlebars
  {{skill-list-item-link
    matched=matched
    skill=skill
    toggleSkill=(action toggleSkill)
  }}
  ```

  @class skill-list-item-link
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: 'skill-list-item-link',
  classNameBindings: ['justClicked', 'justRemoved', 'matched'],
  tagName: 'a',

  session: service(),

  click() {
    if (get(this, 'session.isAuthenticated')) {
      this._toggleClickState();

      let skill = get(this, 'skill');
      get(this, 'toggleSkill')(skill);
    }
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
