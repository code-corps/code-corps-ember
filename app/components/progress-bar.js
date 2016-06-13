import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNames: ['progress-bar'],

  style: Ember.computed('percentage', function() {
    let percentage = this.get('percentage') || 0;
    let css = "width: " + percentage + "%;";
    return new Ember.Handlebars.SafeString(css);
  }),
});
