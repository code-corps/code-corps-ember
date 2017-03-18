import Ember from 'ember';

const {
  Component,
  get,
  inject: { service },
  set
} = Ember;

/**
  Shows whether a user has a skill and allows them to add or remove the skill
  in the context of a list of skills.

  ## default usage

  ```handlebars
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

  /**
   * Whether the user just clicked the skill. Resets to `false` on `mouseLeave`.
   * @type {Boolean}
   */
  justClicked: false,

  /**
   * Whether the user just removed the skill. Resets to `false` on `mouseLeave`.
   * @type {Boolean}
   */
  justRemoved: false,

  session: service(),

  /**
   * Toggles the `justClicked` and potentially the `justRemoved` states,
   * and also toggles the skill (add or remove the given skill for the user)
   *
   * Prevents the click from bubbling.
   *
   * @method click
   */
  click(e) {
    e.stopPropagation();

    this._toggleClickState();

    let skill = get(this, 'skill');
    get(this, 'toggleSkill')(skill);
  },

  /**
   * Resets the `justClicked` and `justRemoved` states when the mouse leaves
   *
   * @method mouseLeave
   */
  mouseLeave() {
    this._resetClickState();
  },

  _resetClickState() {
    set(this, 'justClicked', false);
    set(this, 'justRemoved', false);
  },

  _toggleClickState() {
    let userHadSkill = get(this, 'matched');
    if (userHadSkill) {
      set(this, 'justRemoved', true); // User just removed an existing skill
    } else {
      set(this, 'justRemoved', false); // User just added a new skill
    }
    set(this, 'justClicked', true);
  }
});
