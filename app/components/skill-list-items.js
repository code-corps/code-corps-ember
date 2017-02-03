import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, filter, setDiff, sort, union },
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNameBindings: ['overflowHidden:overflow-hidden'],
  classNames: ['skills'],
  tagName: 'ul',
  sortByTitle: ['title:asc'],

  userSkillsList: service(),

  alphaSkills: sort('skills', 'sortByTitle'),
  skillsNotInCommon: setDiff('skillsToFilter', 'skillsInCommon'),
  sortedSkills: union('skillsInCommon', 'skillsNotInCommon'),
  userSkills: alias('userSkillsList.userSkills'),

  skillsInCommon: filter('skillsToFilter', function(skill) {
    let userSkillsList = get(this, 'userSkillsList');
    if (userSkillsList) {
      if (userSkillsList.contains(skill)) {
        return skill;
      }
    }
  }),

  skillsToFilter: computed('alphaSkills', 'userSkills', function() {
    return get(this, 'alphaSkills');
  }),

  actions: {
    skillItemHidden() {
      this.sendAction('skillItemHidden');
    }
  }
});
