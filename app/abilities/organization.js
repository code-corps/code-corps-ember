import { alias } from '@ember/object/computed';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canManage: computed('organization.owner.id', 'currentUser.user.id', function() {
    return get(this, 'organization.owner.id') === get(this, 'currentUser.user.id');
  }),

  organization: alias('model')
});
