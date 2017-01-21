import Ember from 'ember';

const {
  get,
  inject: { service },
  Mixin
} = Ember;

export default Mixin.create({
  loadingBar: service(),

  actions: {
    loading(transition) {
      this._super(...arguments);
      let loadingBar = get(this, 'loadingBar');
      loadingBar.start();
      transition.promise.finally(function() {
        loadingBar.stop();
      });
    },

    error() {
      this._super(...arguments);
      let loadingBar = get(this, 'loadingBar');
      loadingBar.stop();
    }
  }
});
