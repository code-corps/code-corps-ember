import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['overflowHidden:overflow-hidden'],
  classNames: ['skills'],
  tagName: 'ul',
  sortByTitle: ['title:asc'],

  userSkillsService: Ember.inject.service('user-skills'),

  alphaSkills: Ember.computed.sort('skills', 'sortByTitle'),
  skillsNotInCommon: Ember.computed.setDiff('skillsToFilter', 'skillsInCommon'),
  sortedSkills: Ember.computed.union('skillsInCommon', 'skillsNotInCommon'),
  userSkills: Ember.computed.alias('userSkillsService.userSkills'),

  skillsInCommon: Ember.computed.filter('skillsToFilter', function(skill) {
    let userSkillsService = Ember.get(this, 'userSkillsService');
    if (userSkillsService) {
      let hasSkill = userSkillsService.hasSkill(skill);
      if (hasSkill) { return skill; }
    }
  }),

  skillsToFilter: Ember.computed('alphaSkills', 'userSkills', function() {
    return Ember.get(this, 'alphaSkills');
  }),

  actions: {
    skillItemHidden() {
      this.sendAction('skillItemHidden');
    },
  }
});
