import Ember from 'ember';

const {
  $,
  computed,
  get,
  Mixin,
  run,
  set
} = Ember;

export default Mixin.create({
  scrollTimeout: 100,
  boundingClientRect: 0,
  windowHeight: 0,
  windowWidth: 0,

  canAnimate: computed('boundingClientRect', 'windowHeight', function() {
    let rect, windowHeight;
    rect = get(this, 'boundingClientRect');
    windowHeight = get(this, 'windowHeight');
    return (
      rect.top <= windowHeight - 150
    );
  }),

  _updateBoundingClientRect() {
    let el;
    el = this.$()[0];
    set(this, 'boundingClientRect', el.getBoundingClientRect());
  },

  _setup: (function() {
    return run.scheduleOnce('afterRender', this, function() {
      this._updateBoundingClientRect();
      set(this, 'windowHeight', window.innerHeight || document.documentElement.clientHeight);
      set(this, 'windowWidth', window.innerWidth || document.documentElement.clientWidth);
    });
  }).on('didInsertElement'),

  _scrollHandler() {
    return run.debounce(this, '_updateBoundingClientRect', get(this, 'scrollTimeout'));
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
