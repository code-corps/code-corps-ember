import Ember from 'ember';
import recordsList from 'code-corps-ember/utils/records-list';

const {
  computed: {
    alias, empty
  },
  get,
  getProperties,
  inject: { service },
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
    return recordsList.contains(userSkills, skill);
  },

  find(skill) {
    let { userSkills, user } = getProperties(this, 'userSkills', 'user');
    return recordsList.find(userSkills, skill, user);
  },

  remove(skill) {
    let userSkill = this.find(skill);
    return userSkill.destroyRecord();
  },

  toggle(skill) {
    let userSkills = get(this, 'userSkills');
    if (recordsList.contains(userSkills, skill)) {
      return this.remove(skill);
    } else {
      return this.add(skill);
    }
  }
});
