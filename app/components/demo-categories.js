import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
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

  _animateItems: Ember.observer('animated', function() {
    if (this.get('animated')) {
      let categories = this.get('categories');
      let indexesToAnimate = [0, 2];

      Ember.run.later(() => {
        indexesToAnimate.forEach((index) => {
          let category = categories[index];
          this.get('_animateItem').perform(category);
        });
      }, 1500);
    }
  }),

  _animateItem: task(function * (category) {
    category.set('selected', true);
    category.set('isLoading', true);
    Ember.run.later(() => {
      category.set('isLoading', false);
    }, 700);
    yield timeout(1500);
  }).enqueue(),
});
