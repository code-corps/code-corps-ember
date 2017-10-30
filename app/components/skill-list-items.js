import Component from '@ember/component';
import {
  union,
  sort,
  setDiff,
  filter,
  alias
} from '@ember/object/computed';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNameBindings: ['overflowHidden:overflow-hidden'],
  classNames: ['skills'],
  tagName: 'ul',
  sortByTitle: ['title:asc'],

  isClickable: false,

  currentUser: service(),
  userSkillsList: service(),

  alphaSkills: sort('skills', 'sortByTitle'),
  skillsNotInCommon: setDiff('skillsToFilter', 'skillsInCommon'),
  sortedSkills: union('skillsInCommon', 'skillsNotInCommon'),
  user: alias('currentUser.user'),
  userSkills: alias('user.userSkills'),

  skillsInCommon: filter('skillsToFilter', function(skill) {
    return get(this, 'userSkillsList').find(skill);
  }),

  skillsToFilter: computed('alphaSkills', function() {
    return get(this, 'alphaSkills');
  }),

  actions: {
    skillItemHidden() {
      this.sendAction('skillItemHidden');
    }
  }
});
