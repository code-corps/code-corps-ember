import { set } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  isReduced: true,

  enlarge() {
    set(this, 'isReduced', false);
  },

  reduce() {
    set(this, 'isReduced', true);
  }
});
