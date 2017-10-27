import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

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
      return true;
    },

    error() {
      this._super(...arguments);
      let loadingBar = get(this, 'loadingBar');
      loadingBar.stop();
    }
  }
});
