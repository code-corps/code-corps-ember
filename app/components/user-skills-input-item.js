import Ember from 'ember';

const {
  Component,
  computed: { alias, mapBy },
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
  userSkills: alias('currentUser.user.userSkills'),
  addedSkills: mapBy('userSkills', 'skill'),
  hasSkill: computed('addedSkills', 'skill', function() {
    let { addedSkills, skill } = getProperties(this, 'addedSkills', 'skill');
    return addedSkills.any((addedSkill) => {
      return get(addedSkill, 'id') == get(skill, 'id');
    });
  }),

  mouseDown() {
    let skill = get(this, 'skill');
    get(this, 'selectSkill')(skill);
  },

  selected: alias('skill.selected'),

  mouseEnter() {
    this.sendAction('hover', get(this, 'skill'));
  }
});
