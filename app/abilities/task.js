import { or, equal, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { Ability } from 'ember-can';
import projectMember from 'code-corps-ember/macros/project-member';

export default Ability.extend({
  currentUser: service(),

  task: alias('model'),

  userIsAuthor: computed('task.user.id', 'currentUser.user.id', function() {
    let taskUserId = this.get('task.user.id');
    let currentUserId = this.get('currentUser.user.id');

    if (isEmpty(currentUserId)) {
      return false;
    } else {
      return taskUserId === currentUserId;
    }
  }),

  projectMembership: projectMember('task.project.projectUsers', 'currentUser.user'),

  userRole: alias('projectMembership.role'),
  userIsContributor: equal('userRole', 'contributor'),
  userIsAdmin: equal('userRole', 'admin'),
  userIsOwner: equal('userRole', 'owner'),

  //
  // Abilities
  //

  // task authors, admins and owners can edit
  canEdit: or('{userIsAuthor,userIsAdmin,userIsOwner}'),
  // task authors, contributors, admins and owners can assign and reposition
  canArchive: alias('canAssign'),
  canAssign: or('canEdit', 'userIsContributor'),
  canReposition: alias('canAssign')
});
