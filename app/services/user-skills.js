import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),

  isEmpty: Ember.computed.empty('userSkills'),
  user: Ember.computed.alias('currentUser.user'),

  userSkills: Ember.computed('user.userSkills',
    'user.userSkills.@each.skill',
    'user.userSkills.@each.user',
  function() {
    return this.get('user.userSkills');
  }),

  addSkill(skill) {
    let user = this.get('user');
    let userSkill = this.get('store').createRecord('user-skill', {
      user: user,
      skill: skill
    });
    return userSkill.save();
  },

  hasSkill(skill) {
    let userSkills = this.get('userSkills');
    if (userSkills) {
      let matchedSkill = userSkills.find(function(item) {
        let itemSkillId = item.belongsTo('skill').id();
        let skillId = skill.get('id');
        return (itemSkillId === skillId);
      }.bind(this));
      return !Ember.isEmpty(matchedSkill);
    }
  },

  findUserSkill: function(skill) {
    let userSkills = this.get('userSkills');
    if (userSkills) {
      let userSkill = userSkills.find((item) => {
        let itemUserId = item.belongsTo('user').id();
        let itemSkillId = item.belongsTo('skill').id();
        let userId = this.get('user.id');
        let skillId = skill.get('id');
        return (itemUserId === userId) && (itemSkillId === skillId);
      });
      return userSkill;
    }
  },

  removeSkill(skill) {
    let userSkill = this.findUserSkill(skill);
    return userSkill.destroyRecord();
  },
});
