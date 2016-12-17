import Ember from 'ember';

const {
  Component,
  computed: {
    alias
  },
  inject: {
    service
  }
} = Ember;

export default Component.extend({
  classNameBindings: ['isLoading'],
  classNames: ['loading-bar'],

  loadingBar: service(),

  isLoading: alias('loadingBar.isLoading')
});
