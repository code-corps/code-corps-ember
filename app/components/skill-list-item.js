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
  userSkills: service(),
  user: alias('currentUser.user'),
  usersUserSkills: alias('user.userSkills'),

  userSkill: computed('skill', 'userSkills.userSkills.isFulfilled', function() {
    let skill = get(this, 'skill');
    let userSkills = get(this, 'userSkills');
    let result = userSkills.findUserSkill(skill);
    return result;
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
