import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, notEmpty },
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
    let skill = this.get('skill');
    let userSkills = this.get('userSkills');
    return userSkills.findUserSkill(skill);
  }),

  mouseDown() {
    this.sendAction('hover', this.get('skill'));
    this.sendAction('selectSkill');
  },

  mouseEnter() {
    this.sendAction('hover', this.get('skill'));
  }
});
