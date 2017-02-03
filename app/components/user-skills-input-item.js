import Ember from 'ember';

const {
  Component,
  computed: { alias },
  computed,
  get,
  getProperties,
  inject: { service }
} = Ember;

export default Component.extend({
  classNameBindings: ['hasSkill', 'selected:selected'],
  classNames: ['skill-dropdown-item'],
  tagName: ['li'],

  currentUser: service(),
  userSkillsList: service(),

  hasSkill: computed('skill', function() {
    let { skill, userSkillsList } = getProperties(this, 'skill', 'userSkillsList');
    return userSkillsList.contains(skill);
  }),
  selected: alias('skill.selected'),

  mouseDown() {
    let skill = get(this, 'skill');
    get(this, 'selectSkill')(skill);
  },

  mouseEnter() {
    let skill = get(this, 'skill');
    this.sendAction('hover', skill);
  }
});
