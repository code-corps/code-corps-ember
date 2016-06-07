import Ember from 'ember';

export default Ember.Service.extend({
  reset: function() {
    Ember.$('html').removeClass('warning danger');
  },

  setBackgroundClass: Ember.computed(function() {
    return () => {
      Ember.$('html').addClass(this.get('class'));
    };
  }),

  updateBackgroundClass: function() {
    Ember.run.once(this, this.get('setBackgroundClass'));
  },
});
