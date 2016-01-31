import Ember from 'ember';

export default Ember.Service.extend({
  updateBackgroundClass: function() {
    Ember.run.once(this, this.get('setBackgroundClass'));
  },
  setBackgroundClass: Ember.computed(function() {
    return () => {
      Ember.$('html').addClass(this.get('class'));
    };
  }),
  reset: function() {
    Ember.$('html').removeClass('warning danger');
  }
});
