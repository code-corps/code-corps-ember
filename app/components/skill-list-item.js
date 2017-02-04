import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, notEmpty },
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['skill-list-item'],
  classNameBindings: ['matched'],
  tagName: 'li',

  store: service(),
  userSkillsList: service(),

  matched: notEmpty('userSkill'),
  user: alias('currentUser.user'),

  userSkill: computed('skill', 'userSkillsList.userSkills.@each.userSkill', 'userSkillsList.userSkills.isFulfilled', function() {
    let skill = get(this, 'skill');
    let userSkillsList = get(this, 'userSkillsList');
    let result = userSkillsList.find(skill);
    return result;
  }),

  click() {
    let skill = get(this, 'skill');
    return get(this, 'userSkillsList').toggle(skill);
  },

  didRender() {
    this._super(...arguments);
    let parentBottom = this.$().parent()[0].getBoundingClientRect().bottom;
    let elementBottom = this.$()[0].getBoundingClientRect().bottom;

    if (elementBottom > parentBottom) {
      this.sendAction();
    }
  }
});
