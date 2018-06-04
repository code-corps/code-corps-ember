import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { alias, and } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { ability } from 'ember-can/computed';

export default Component.extend({
  classNames: ['project-user-role-modal-container'],
  tagName: 'span',

  currentUser: service(),

  projectUser: null,
  save: null,
  selectedRole: null,
  showModal: false,

  ability: ability('project'),
  canManage: alias('ability.canManage'),
  demotionDisabled: and('canManage', 'isSelf'),
  user: alias('currentUser.user'),

  isSelf: computed('projectUser', 'user', function() {
    return get(this, 'projectUser.user.id') === get(this, 'user.id');
  }),

  init() {
    this._super(...arguments);
    let role = get(this, 'projectUser.role');
    set(this, 'selectedRole', role);
  }
});
