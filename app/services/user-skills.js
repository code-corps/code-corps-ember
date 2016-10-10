import Ember from 'ember';

const {
  computed,
  inject: { service },
  isEmpty,
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  isEmpty: computed.empty('userSkills'),
  user: computed.alias('currentUser.user'),

  userSkills: computed('user.userSkills',
    'user.userSkills.@each.skill',
    'user.userSkills.@each.user',
  function() {
    return this.get('user.userSkills');
  }),

  addSkill(skill) {
    let user = this.get('user');
    let userSkill = this.get('store').createRecord('user-skill', {
      user,
      skill
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
      return !isEmpty(matchedSkill);
    }
  },

  findUserSkill(skill) {
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
  }
});
