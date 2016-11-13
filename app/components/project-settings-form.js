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
      let flashMessages = get(this, 'flashMessages');

      this.get('project').save().then(() => {
        flashMessages.success('Project updated successfully');
      });
    }
  }
});
