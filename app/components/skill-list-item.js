import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['matched'],
  tagName: 'li',

  matched: Ember.computed.notEmpty('userSkill'),
  userSkills: Ember.inject.service(),
  user: Ember.computed.alias('currentUser.user'),
  usersUserSkills: Ember.computed.alias('user.userSkills'),

  userSkill: Ember.computed('skill', 'userSkills.userSkills.isFulfilled', function() {
    let skill = this.get('skill');
    let userSkills = this.get('userSkills');
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
  },
});
