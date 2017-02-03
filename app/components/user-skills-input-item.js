import Ember from 'ember';

const {
  Component,
  computed: { alias, mapBy },
  computed,
  get,
  getProperties
} = Ember;

export default Component.extend({
  classNameBindings: ['hasSkill', 'selected:selected'],
  classNames: ['skill-dropdown-item'],
  tagName: ['li'],

  addedSkills: mapBy('userSkills', 'skill'),
  hasSkill: computed('addedSkills', 'skill', function() {
    let { addedSkills, skill } = getProperties(this, 'addedSkills', 'skill');

    return addedSkills.any((addedSkill) => {
      return get(addedSkill, 'id') == get(skill, 'id');
    });
  }),

  mouseDown() {
    let skill = get(this, 'skill');
    get(this, 'addSkill')(skill);
  },

  selected: alias('skill.selected'),

  mouseEnter() {
    this.sendAction('hover', get(this, 'skill'));
  }
});
