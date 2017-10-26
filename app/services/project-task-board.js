import Ember from 'ember';
import $ from 'jquery';

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
    $('body').addClass('task-board-body');
  },

  deactivate() {
    set(this, 'isViewing', false);
    $('body').removeClass('task-board-body');
  }
});
