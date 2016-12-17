import Ember from 'ember';

const {
  Service,
  set
} = Ember;

export default Service.extend({
  isLoading: false,

  start() {
    set(this, 'isLoading', true);
  },

  stop() {
    set(this, 'isLoading', false);
  }
});
