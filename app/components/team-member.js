import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: 'li',

  src: computed('imageSlug', function() {
    let imageSlug = get(this, 'imageSlug');
    return `https://d3pgew4wbk2vb1.cloudfront.net/images/team/${imageSlug}.png`;
  })
});
