import BeforeOptionsComponent from 'ember-power-select/components/power-select/before-options';
import Ember from 'ember';

const { get } = Ember;

export default BeforeOptionsComponent.extend({
  actions: {
    close() {
      get(this, 'selectRemoteController').actions.close();
    }
  }
});
