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
      this.get('project').save().then(() => {
        get(this, 'flashMessages').clearMessages().success('Project updated successfully');
      });
    }
  }
});
