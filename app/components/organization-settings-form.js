import Ember from 'ember';

const {
  Component,
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['organization-settings-form'],

  flashMessages: service(),

  actions: {
    save() {
      get(this, 'organization').save().then(() => {
        get(this, 'flashMessages').clearMessages().success('Organization updated successfully');
      });
    }
  }
});
