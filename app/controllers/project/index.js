import Controller from '@ember/controller';
import { mapBy, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),

  projectUsers: mapBy('project.projectUsers', 'user'),
  usersCount: alias('users.length'),
  projectSkills: mapBy('project.projectSkills', 'skill')
});
