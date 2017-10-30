import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { getProperties, get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNameBindings: ['hasSkill', 'selected:selected'],
  classNames: ['skill-dropdown-item'],
  tagName: ['li'],

  currentUser: service(),

  hasSkill: computed('skill', function() {
    let { skill, skillsList } = getProperties(this, 'skill', 'skillsList');
    return skillsList.includes(skill);
  }),
  selected: alias('skill.selected'),

  mouseDown() {
    let skill = get(this, 'skill');
    this.sendAction('selectSkill', skill);
  },

  mouseEnter() {
    let skill = get(this, 'skill');
    this.sendAction('hover', skill);
  }
});
