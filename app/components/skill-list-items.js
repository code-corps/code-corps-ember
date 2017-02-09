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
