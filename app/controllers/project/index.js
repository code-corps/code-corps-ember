import Ember from 'ember';

const {
  Controller,
  computed: { alias, mapBy },
  inject: { service }
} = Ember;

export default Controller.extend({
  currentUser: service(),

  projectUsers: mapBy('project.projectUsers', 'user'),
  usersCount: alias('members.length'),
  projectSkills: mapBy('project.projectSkills', 'skill')
});
