import { get } from '@ember/object';
import BeforeOptionsComponent from 'ember-power-select/components/power-select/before-options';

export default BeforeOptionsComponent.extend({
  actions: {
    close() {
      get(this, 'selectRemoteController').actions.close();
    }
  }
});
