import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const {
  Component,
  observer,
  run: { later },
  get, set,
  testing
} = Ember;

const INIT_DELAY          = testing ? 0 : 1500;
const LOADING_TOGGLE      = testing ? 0 : 700;
const CONCURRENCY_TIMEOUT = testing ? 0 : 1500;

export default Component.extend({
  categories: [
    {
      description: 'You want to improve government responsiveness.',
      isLoading: false,
      name: 'Government',
      selected: false,
      slug: 'government'
    },
    {
      description: 'You want to improve tools for advancing science.',
      isLoading: false,
      name: 'Science',
      selected: false,
      slug: 'science'
    },
    {
      description: 'You want to improve software tools and infrastructure.',
      isLoading: false,
      name: 'Technology',
      selected: false,
      slug: 'technology'
    }
  ],
  classNames: ['demo-categories'],

  _animateItems: observer('animated', function() {
    if (get(this, 'animated')) {
      let categories = get(this, 'categories');
      let indexesToAnimate = [0, 2];

      later(() => {
        indexesToAnimate.forEach((index) => {
          let category = categories[index];
          get(this, '_animateItem').perform(category);
        });
      }, INIT_DELAY);
    }
  }),

  _animateItem: task(function* (category) {
    set(category, 'selected', true);
    set(category, 'isLoading', true);
    later(() => {
      set(category, 'isLoading', false);
    }, LOADING_TOGGLE);
    yield timeout(CONCURRENCY_TIMEOUT);
  }).enqueue()
});
