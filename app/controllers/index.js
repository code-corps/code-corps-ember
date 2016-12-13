import Ember from 'ember';
import moment from 'moment';

const { Controller } = Ember;

export default Controller.extend({
  typedStrings: [
    'social good.',
    'elections.',
    'schools.',
    'the environment.',
    'science.',
    'hospitals.',
    'ending poverty.',
    'political activism.',
    'communities.',
    'justice.',
    'ending climate change.',
    'families.',
    'government.'
  ],
  tasks: [
    Ember.Object.create({
      insertedAt: moment().subtract(10, 'weeks'),
      number: 1,
      taskType: 'idea',
      title: 'Implement drag and drop'
    }),
    Ember.Object.create({
      insertedAt: moment().subtract(1, 'days'),
      number: 2,
      taskType: 'issue',
      title: 'Fix the way we handle positioning'
    })
  ],
  otherTasks: [
    Ember.Object.create({
      insertedAt: moment().subtract(3, 'days'),
      number: 3,
      taskType: 'task',
      title: 'Figure out the best Ember library for drag and drop'
    })
  ],
  dragulaconfig: {
    options: {
        copy: false,
        revertOnSpill: false,
        removeOnSpill: false
        // Other options from the dragula source page.
    },
    enabledEvents: ['drag', 'drop']
  },

  actions: {
    onDrop(el, target, source, sibling) {
      console.log(el, target, source, sibling);
    }
  }
});
