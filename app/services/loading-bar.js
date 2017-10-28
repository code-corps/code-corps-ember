import Service from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  isLoading: false,

  start() {
    set(this, 'isLoading', true);
  },

  stop() {
    set(this, 'isLoading', false);
  }
});
