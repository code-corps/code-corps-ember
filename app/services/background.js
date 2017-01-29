import Ember from 'ember';

const {
  $,
  computed,
  get,
  run,
  Service
} = Ember;

export default Service.extend({
  reset() {
    $('html').removeClass('warning danger');
  },

  setBackgroundClass: computed(function() {
    return () => {
      $('html').addClass(get(this, 'class'));
    };
  }),

  updateBackgroundClass() {
    run.once(this, get(this, 'setBackgroundClass'));
  }
});
