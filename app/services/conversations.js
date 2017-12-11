import Service from '@ember/service';
import { computed, get, set } from '@ember/object';

export default Service.extend({
  isViewing: false,

  className: computed('isViewing', function() {
    let isViewing = get(this, 'isViewing');
    if (isViewing) {
      return 'fill-height';
    }
  }),

  activate() {
    set(this, 'isViewing', true);
  },

  deactivate() {
    set(this, 'isViewing', false);
  }
});
