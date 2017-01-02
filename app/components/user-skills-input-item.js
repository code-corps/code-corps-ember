import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, notEmpty },
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNameBindings: ['hasSkill', 'selected:selected'],
  classNames: ['skill-dropdown-item'],
  tagName: ['li'],

  userSkills: service(),

  hasSkill: notEmpty('userSkill'),
  selected: alias('skill.selected'),

  userSkill: computed('skill', 'userSkills.userSkills', function() {
    let skill = get(this, 'skill');
    let userSkills = get(this, 'userSkills');
    return userSkills.findUserSkill(skill);
  }),

  mouseDown() {
    this.sendAction('hover', get(this, 'skill'));
    this.sendAction('selectSkill');
  },

  mouseEnter() {
    this.sendAction('hover', get(this, 'skill'));
  }
});
