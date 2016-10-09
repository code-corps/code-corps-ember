import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const {
  Component,
  observer,
  run: { later },
  testing
} = Ember;

const INIT_DELAY          = testing ? 0 : 1500;
const LOADING_TOGGLE      = testing ? 0 : 700;
const CONCURRENCY_TIMEOUT = testing ? 0 : 1500;

export default Component.extend({
  categories: [
    Ember.Object.create({
      description: "You want to improve government responsiveness.",
      isLoading: false,
      name: "Government",
      selected: false,
      slug: "government"
    }),
    Ember.Object.create({
      description: "You want to improve tools for advancing science.",
      isLoading: false,
      name: "Science",
      selected: false,
      slug: "science"
    }),
    Ember.Object.create({
      description: "You want to improve software tools and infrastructure.",
      isLoading: false,
      name: "Technology",
      selected: false,
      slug: "technology"
    }),
  ],
  classNames: ['demo-categories'],

  _animateItems: observer('animated', function() {
    if (this.get('animated')) {
      let categories = this.get('categories');
      let indexesToAnimate = [0, 2];

      later(() => {
        indexesToAnimate.forEach((index) => {
          let category = categories[index];
          this.get('_animateItem').perform(category);
        });
      }, INIT_DELAY);
    }
  }),

  _animateItem: task(function* (category) {
    category.set('selected', true);
    category.set('isLoading', true);
    later(() => {
      category.set('isLoading', false);
    }, LOADING_TOGGLE);
    yield timeout(CONCURRENCY_TIMEOUT);
  }).enqueue(),
});
