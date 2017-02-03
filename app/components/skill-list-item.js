import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, notEmpty },
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNameBindings: ['matched'],
  tagName: 'li',

  matched: notEmpty('userSkill'),
  userSkillsList: service(),
  user: alias('currentUser.user'),

  userSkill: computed('skill', 'userSkillsList.userSkills.isFulfilled', function() {
    let skill = get(this, 'skill');
    let userSkillsList = get(this, 'userSkillsList');
    return userSkillsList.find(skill);
  }),

  didRender() {
    this._super(...arguments);
    let parentBottom = this.$().parent()[0].getBoundingClientRect().bottom;
    let elementBottom = this.$()[0].getBoundingClientRect().bottom;

    if (elementBottom > parentBottom) {
      this.sendAction();
    }
  }
});
