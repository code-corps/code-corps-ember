import Component from '@ember/component';
import { mapBy } from '@ember/object/computed';

export default Component.extend({
  classNames: ['user-details'],

  userProjects: mapBy('user.projectUsers', 'project')
});
