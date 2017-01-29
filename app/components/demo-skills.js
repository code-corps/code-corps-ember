import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const {
  Component,
  get,
  Object,
  observer,
  run: { later },
  set,
  testing
} = Ember;

const INIT_DELAY          = testing ? 0 : 1500;
const LOADING_TOGGLE      = testing ? 0 : 700;
const CONCURRENCY_TIMEOUT = testing ? 0 : 1000;

export default Component.extend({
  skills: [
    Object.create({
      isLoading: false,
      title: 'BASIC'
    }),
    Object.create({
      isLoading: false,
      title: 'Copywriting'
    }),
    Object.create({
      isLoading: false,
      title: 'Ember.js'
    }),
    Object.create({
      isLoading: false,
      title: 'HTML'
    }),
    Object.create({
      isLoading: false,
      title: 'Python'
    }),
    Object.create({
      isLoading: false,
      title: 'Rails'
    }),
    Object.create({
      isLoading: false,
      title: 'Ruby'
    }),
    Object.create({
      isLoading: false,
      title: 'SEO'
    }),
    Object.create({
      isLoading: false,
      title: 'Sketch'
    }),
    Object.create({
      isLoading: false,
      title: 'UX Design'
    })
  ],
  classNames: ['demo-skills'],

  _animateItems: observer('animated', function() {
    if (get(this, 'animated')) {
      let skills = get(this, 'skills');
      let indexesToAnimate = [2, 3, 5, 6, 8, 9];

      later(() => {
        indexesToAnimate.forEach((index) => {
          let skill = skills[index];
          get(this, '_animateItem').perform(skill);
        });
      }, INIT_DELAY);
    }
  }),

  _animateItem: task(function* (skill) {
    set(skill, 'selected', true);
    set(skill, 'isLoading', true);
    later(() => {
      set(skill, 'isLoading', false);
    }, LOADING_TOGGLE);
    yield timeout(CONCURRENCY_TIMEOUT);
  }).enqueue()
});
