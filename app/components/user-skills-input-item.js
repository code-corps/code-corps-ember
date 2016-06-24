import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['hasSkill', 'selected:selected'],
  classNames: ['skill-dropdown-item'],
  tagName: ['li'],

  userSkills: Ember.inject.service(),

  hasSkill: Ember.computed.notEmpty('userSkill'),
  selected: Ember.computed.alias('skill.selected'),

  userSkill: Ember.computed('skill', 'userSkills.userSkills', function() {
    let skill = this.get('skill');
    let userSkills = this.get('userSkills');
    return userSkills.findUserSkill(skill);
  }),

  click() {
    this.sendAction('hover', this.get('skill'));
    this.sendAction('selectSkill');
  },

  mouseEnter() {
    this.sendAction('hover', this.get('skill'));
  },
});
