import { set } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  isShrunken: true,

  enlarge() {
    set(this, 'isShrunken', false);
  },

  shrink() {
    set(this, 'isShrunken', true);
  }
});
