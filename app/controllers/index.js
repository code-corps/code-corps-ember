import Ember from 'ember';
import moment from 'moment';

const {
  $,
  Controller,
  Object
} = Ember;

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
  taskLists: [
    Object.create({
      id: 1,
      tasks: [
        Object.create({
          id: 1,
          insertedAt: moment().subtract(10, 'weeks'),
          number: 1,
          order: 2,
          taskType: 'idea',
          title: 'Implement drag and drop'
        }),
        Object.create({
          id: 2,
          insertedAt: moment().subtract(1, 'days'),
          number: 2,
          order: 1,
          taskType: 'issue',
          title: 'Fix the way we handle positioning'
        })
      ]
    }),
    Object.create({
      id: 2,
      tasks: [
        Object.create({
          id: 3,
          insertedAt: moment().subtract(3, 'days'),
          number: 3,
          order: 1,
          taskType: 'task',
          title: 'Figure out the best Ember library for drag and drop'
        })
      ],
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
    onDrop(el, target) {
      let listId = target.dataset.modelId;
      let position = $(el).index();
      let taskId = el.dataset.modelId;
      console.log(taskId, position, listId);
    }
  }
});
