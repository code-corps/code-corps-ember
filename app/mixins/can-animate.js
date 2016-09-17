import Ember from 'ember';

export default Ember.Mixin.create({
  scrollTimeout: 100,
  boundingClientRect: 0,
  windowHeight: 0,
  windowWidth: 0,

  canAnimate: Ember.computed('boundingClientRect', 'windowHeight', 'windowWidth', function() {
    var rect, windowHeight, windowWidth;
    rect = this.get('boundingClientRect');
    windowHeight = this.get('windowHeight');
    windowWidth = this.get('windowWidth');
    return (
      rect.top <= windowHeight - 150
    );
  }),

  _updateBoundingClientRect: function() {
    var el;
    el = this.$()[0];
    this.set('boundingClientRect', el.getBoundingClientRect());
  },

  _setup: (function() {
    return Ember.run.scheduleOnce('afterRender', this, function() {
      this._updateBoundingClientRect();
      this.set('windowHeight', window.innerHeight || document.documentElement.clientHeight);
      this.set('windowWidth', window.innerWidth || document.documentElement.clientWidth);
    });
  }).on('didInsertElement'),

  _scrollHandler: function() {
    return Ember.run.debounce(this, '_updateBoundingClientRect', this.get('scrollTimeout'));
  },

  _bindScroll: (function() {
    var scrollHandler;
    scrollHandler = this._scrollHandler.bind(this);
    Ember.$(document).on('touchmove.scrollable', scrollHandler);
    Ember.$(window).on('scroll.scrollable', scrollHandler);
  }).on('didInsertElement'),

  _unbindScroll: (function() {
    Ember.$(window).off('.scrollable');
    Ember.$(document).off('.scrollable');
  }).on('willDestroyElement')
});
