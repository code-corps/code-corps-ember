import Ember from 'ember';

const {
  $,
  computed,
  run,
  Service
} = Ember;

export default Service.extend({
  reset() {
    $('html').removeClass('warning danger');
  },

  setBackgroundClass: computed(function() {
    return () => {
      $('html').addClass(this.get('class'));
    };
  }),

  updateBackgroundClass() {
    run.once(this, this.get('setBackgroundClass'));
  }
});
