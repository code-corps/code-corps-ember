import Ember from 'ember';

const {
  Component,
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['project-settings-form'],

  flashMessages: service(),

  actions: {
    save() {
      get(this, 'project').save().then(() => {
        get(this, 'flashMessages').clearMessages().success('Project updated successfully');
      });
    }
  }
});
