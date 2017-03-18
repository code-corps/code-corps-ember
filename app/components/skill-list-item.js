import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, and, notEmpty },
  get,
  inject: { service }
} = Ember;

/**
  Shows whether a user has a skill and determines whether to display the
  `skill-list-item-link` component, depending on the value of `isClickable`
  and `session.isAuthenticated`.

  ## advanced usage

  ```handlebars
  {{skill-list-item
    action="skillItemHidden"
    isClickable=true
    skill=skill
  }}
  ```

  @class skill-list-item
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['skill-list-item'],
  tagName: 'li',

  /**
   * Set by the user. Determines whether the user can add/remove skills in
   * place.
   *
   * Consider the UX when determining whether to set this to `true`, e.g.
   * adding in place works well when the user is joining a project, but
   * may not make sense in an environment where they're not actively editing
   * data.
   *
   * @type {Boolean}
   */
  isClickable: false,

  session: service(),
  store: service(),
  userSkillsList: service(),

  /**
   * Determines whether the user can add/remove the skill by clicking.
   * @type {Boolean}
   */
  canClick: and('isClickable', 'session.isAuthenticated'),

  /**
   * The `skill` is `matched` if the user has a `userSkill` for that `skill`
   * @type {Boolean}
   */
  matched: notEmpty('userSkill'),

  user: alias('currentUser.user'),

  /**
   * Returns the `user`'s `userSkill` for the `skill` by searching their
   * `userSkills`
   * @type DS.Model
   */
  userSkill: computed('skill', 'userSkillsList.userSkills.@each.userSkill', 'userSkillsList.userSkills.isFulfilled', function() {
    let skill = get(this, 'skill');
    let userSkillsList = get(this, 'userSkillsList');
    let result = userSkillsList.find(skill);
    return result;
  }),

  /**
   * Sends the `action` when the skill list is partially hidden. Useful for the
   * project card where we want to toggle to expand more than a few lines of
   * skills.
   * @method didRender
   */
  didRender() {
    this._super(...arguments);
    let parentBottom = this.$().parent()[0].getBoundingClientRect().bottom;
    let elementBottom = this.$()[0].getBoundingClientRect().bottom;

    if (elementBottom > parentBottom) {
      this.sendAction();
    }
  },

  /**
   * Adds or removes the skill, depending on whether the user has the skill.
   * @method toggleSkill
   * @param {DS.Model} skill
   * @return {DS.Model} skill
   */
  toggleSkill(skill) {
    return get(this, 'userSkillsList').toggle(skill);
  }
});
