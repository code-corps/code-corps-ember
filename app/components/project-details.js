import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-details'],
  classNameBindings: ['expanded'],
  expanded: false,

  store: Ember.inject.service(),
  session: Ember.inject.service(),
  credentials: Ember.inject.service(),

  actions: {
    joinProject() {
      let currentUser = this.get('session.currentUser');

      this.get('project.organization').then((organization) => {
        let membership = this.get('store').createRecord('organization-membership', {
          member: currentUser,
          organization: organization,
          role: 'pending'
        });

        return membership.save();
      });
    }
  }
});
