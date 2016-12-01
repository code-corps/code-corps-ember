import Ember from 'ember';

const {
  Component,
  computed,
  get,
  run,
  set
} = Ember;

export default Component.extend({
  classNames: ['animated-high-five'],
  classNameBindings: ['currentImage', 'initialAnimation', 'followOnAnimation', 'reset'],

  images: ['tone-1f3fb', 'tone-1f3fc', 'tone-1f3ff', 'tone-1f3fe', 'tone-1f3fd'],

  currentImage: null,
  followOnAnimation: false,
  initialAnimation: true,
  reset: false,

  init() {
    this._super(...arguments);
    this.selectImage();
  },

  willDestroyElement() {
    let followOnTimer = get(this, 'followOnTimer');
    let resetTimer = get(this, 'resetTimer');
    run.cancel(followOnTimer);
    run.cancel(resetTimer);
  },

  availableImages: computed.setDiff('images', 'currentImageArray'),

  currentImageArray: computed('currentImage', function() {
    let currentImage = get(this, 'currentImage');
    return [currentImage];
  }),

  selectImage() {
    let images = get(this, 'availableImages');
    let image = images[Math.floor(Math.random() * images.length)];
    let that = this;

    set(this, 'currentImage', image);
    let followOnTimer = run.later((function() {
      set(that, 'followOnAnimation', false);
    }), 500);

    set(this, 'followOnTimer', followOnTimer);
    set(this, 'reset', true);

    let resetTimer = run.later((function() {
      set(that, 'reset', false);
    }), 1);
    set(this, 'resetTimer', resetTimer);
  },

  click() {
    let that = this;
    let followOnTimer = get(this, 'followOnTimer');

    run.cancel(followOnTimer);
    this.selectImage();

    set(that, 'initialAnimation', false);
    set(that, 'followOnAnimation', true);
  }
});
