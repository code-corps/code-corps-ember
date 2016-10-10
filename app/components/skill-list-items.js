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

  userSkillsService: service('user-skills'),

  alphaSkills: sort('skills', 'sortByTitle'),
  skillsNotInCommon: setDiff('skillsToFilter', 'skillsInCommon'),
  sortedSkills: union('skillsInCommon', 'skillsNotInCommon'),
  userSkills: alias('userSkillsService.userSkills'),

  skillsInCommon: filter('skillsToFilter', function(skill) {
    let userSkillsService = get(this, 'userSkillsService');
    if (userSkillsService) {
      let hasSkill = userSkillsService.hasSkill(skill);
      if (hasSkill) {
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
