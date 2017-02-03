import Ember from 'ember';
import skillsList from 'code-corps-ember/utils/skills-list';

const {
  computed: {
    alias, empty
  },
  get,
  getProperties,
  inject: { service },
  isEmpty,
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  isEmpty: empty('userSkills'),
  user: alias('currentUser.user'),
  userSkills: alias('user.userSkills'),

  add(skill) {
    let { store, user } = getProperties(this, 'store', 'user');
    return store.createRecord('user-skill', { user, skill }).save();
  },

  contains(skill) {
    let userSkills = get(this, 'userSkills');
    return skillsList.contains(userSkills, skill);
  },

  find(skill) {
    let userSkills = get(this, 'userSkills');
    let user = get(this, 'user');
    return skillsList.find(userSkills, skill, user);
  },

  remove(skill) {
    let { userSkills, user } = getProperties(this, 'userSkills', 'user');
    let userSkill = skillsList.find(userSkills, skill, user);
    return userSkill.destroyRecord();
  },

  toggle(skill) {
    let { userSkills, user } = getProperties(this, 'userSkills', 'user');
    let foundSkill = skillsList.find(userSkills, skill, user);

    if (isEmpty(foundSkill)) {
      this.add(skill);
    } else {
      this.remove(skill);
    }
  }
});
