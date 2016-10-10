import Ember from 'ember';

const {
  $,
  computed,
  Mixin,
  run
} = Ember;

export default Mixin.create({
  scrollTimeout: 100,
  boundingClientRect: 0,
  windowHeight: 0,
  windowWidth: 0,

  canAnimate: computed('boundingClientRect', 'windowHeight', function() {
    let rect, windowHeight;
    rect = this.get('boundingClientRect');
    windowHeight = this.get('windowHeight');
    return (
      rect.top <= windowHeight - 150
    );
  }),

  _updateBoundingClientRect() {
    let el;
    el = this.$()[0];
    this.set('boundingClientRect', el.getBoundingClientRect());
  },

  _setup: (function() {
    return run.scheduleOnce('afterRender', this, function() {
      this._updateBoundingClientRect();
      this.set('windowHeight', window.innerHeight || document.documentElement.clientHeight);
      this.set('windowWidth', window.innerWidth || document.documentElement.clientWidth);
    });
  }).on('didInsertElement'),

  _scrollHandler() {
    return run.debounce(this, '_updateBoundingClientRect', this.get('scrollTimeout'));
  },

  _bindScroll: (function() {
    let scrollHandler;
    scrollHandler = this._scrollHandler.bind(this);
    $(document).on('touchmove.scrollable', scrollHandler);
    $(window).on('scroll.scrollable', scrollHandler);
  }).on('didInsertElement'),

  _unbindScroll: (function() {
    $(window).off('.scrollable');
    $(document).off('.scrollable');
  }).on('willDestroyElement')
});
