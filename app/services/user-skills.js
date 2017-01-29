import Ember from 'ember';

const {
  computed,
  get,
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
    return get(this, 'user.userSkills');
  }),

  addSkill(skill) {
    let user = get(this, 'user');
    let userSkill = get(this, 'store').createRecord('user-skill', {
      user,
      skill
    });
    return userSkill.save();
  },

  hasSkill(skill) {
    let userSkills = get(this, 'userSkills');
    if (userSkills) {
      let matchedSkill = userSkills.find(function(item) {
        let itemSkillId = item.belongsTo('skill').id();
        let skillId = get(skill, 'id');
        return (itemSkillId === skillId);
      }.bind(this));
      return !isEmpty(matchedSkill);
    }
  },

  findUserSkill(skill) {
    let userSkills = get(this, 'userSkills');
    if (userSkills) {
      let userSkill = userSkills.find((item) => {
        let itemUserId = item.belongsTo('user').id();
        let itemSkillId = item.belongsTo('skill').id();
        let userId = get(this, 'user.id');
        let skillId = get(skill, 'id');
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
