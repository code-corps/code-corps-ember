import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const {
  Component,
  Object,
  observer,
  run: { later },
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
    if (this.get('animated')) {
      let skills = this.get('skills');
      let indexesToAnimate = [2, 3, 5, 6, 8, 9];

      later(() => {
        indexesToAnimate.forEach((index) => {
          let skill = skills[index];
          this.get('_animateItem').perform(skill);
        });
      }, INIT_DELAY);
    }
  }),

  _animateItem: task(function* (skill) {
    skill.set('selected', true);
    skill.set('isLoading', true);
    later(() => {
      skill.set('isLoading', false);
    }, LOADING_TOGGLE);
    yield timeout(CONCURRENCY_TIMEOUT);
  }).enqueue()
});
