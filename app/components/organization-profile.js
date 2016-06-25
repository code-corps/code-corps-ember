import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['organization-profile'],

  credentials: Ember.inject.service(),

  didReceiveAttrs() {
    this._super(...arguments);
    this.get('credentials').set('currentOrganization', this.get('organization'));
  },
});
