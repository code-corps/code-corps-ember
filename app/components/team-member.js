import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  src: Ember.computed('imageSlug', function() {
    let imageSlug = this.get('imageSlug');
    return `https://d3pgew4wbk2vb1.cloudfront.net/images/team/${imageSlug}.png`;
  }),
});
