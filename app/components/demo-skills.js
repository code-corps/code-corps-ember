import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  skills: [
    Ember.Object.create({
      isLoading: false,
      title: "BASIC"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "Copywriting"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "Ember.js"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "HTML"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "Python"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "Rails"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "Ruby"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "SEO"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "Sketch"
    }),
    Ember.Object.create({
      isLoading: false,
      title: "UX Design"
    }),
  ],
  classNames: ['demo-skills'],

  _animateItems: Ember.observer('animated', function() {
    if (this.get('animated')) {
      let skills = this.get('skills');
      let indexesToAnimate = [2, 3, 5, 6, 8, 9];

      Ember.run.later(() => {
        indexesToAnimate.forEach((index) => {
          let skill = skills[index];
          this.get('_animateItem').perform(skill);
        });
      }, 1500);
    }
  }),

  _animateItem: task(function * (skill) {
    skill.set('selected', true);
    skill.set('isLoading', true);
    Ember.run.later(() => {
      skill.set('isLoading', false);
    }, 700);
    yield timeout(1000);
  }).enqueue(),
});
