import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed,
  computed: { alias },
  get,
  inject: { service }
} = Ember;

export default Ability.extend({
  currentUser: service(),

  canManage: computed('organization.owner.id', 'currentUser.user.id', function() {
    return get(this, 'organization.owner.id') === get(this, 'currentUser.user.id');
  }),

  organization: alias('model')
});
