import Ember from 'ember';

const {
  computed,
  get,
  Service,
  set
} = Ember;

export default Service.extend({
  isViewing: false,

  className: computed('isViewing', function() {
    let isViewing = get(this, 'isViewing');
    if (isViewing) {
      return 'for-project-tasks';
    }
  }),

  activate() {
    set(this, 'isViewing', true);
  },

  deactivate() {
    set(this, 'isViewing', false);
  }
});
