import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  Object
} = Ember;

export default Component.extend({
  classNames: ['demo-tasks'],
  tasks: [
    Object.create({
      insertedAt: moment().subtract(2, 'days'),
      number: 27,
      taskType: 'task',
      title: 'Improve the user experience of the landing page',
      user: {
        username: 'joshsmith'
      },
      skills: [
        {
          title: 'Rails',
          matched: true
        },
        {
          title: 'Ruby',
          matched: true
        },
        {
          title: 'Amazon S3',
          matched: false
        },
        {
          title: 'iOS',
          matched: false
        },
        {
          title: 'PostgreSQL',
          matched: false
        },
        {
          title: 'Swift',
          matched: false
        }
      ]
    }),
    Object.create({
      insertedAt: moment().subtract(3, 'days'),
      number: 26,
      taskType: 'issue',
      title: "When signing up, there doesn't seem to be a GitHub option",
      user: {
        username: 'githubber'
      },
      skills: [
        {
          title: 'Rails',
          matched: true
        },
        {
          title: 'Ruby',
          matched: true
        },
        {
          title: 'Amazon S3',
          matched: false
        },
        {
          title: 'iOS',
          matched: false
        },
        {
          title: 'PostgreSQL',
          matched: false
        },
        {
          title: 'Swift',
          matched: false
        }
      ]
    })
  ]
});
