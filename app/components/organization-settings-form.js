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
      let flashMessages = get(this, 'flashMessages');
      get(this, 'organization').save().then(() => {
        flashMessages.success('Organization updated successfully');
      });
    }
  }
});
