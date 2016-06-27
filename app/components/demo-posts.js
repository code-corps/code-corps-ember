import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['demo-posts'],
  posts: [
    Ember.Object.create({
      createdAt: moment().subtract(2, 'days'),
      number: 27,
      postType: 'task',
      title: "Improve the user experience of the landing page",
      user: {
        username: "joshsmith"
      },
      skills: [
        {
          title: "Rails",
          matched: true,
        },
        {
          title: "Ruby",
          matched: true,
        },
        {
          title: "Amazon S3",
          matched: false,
        },
        {
          title: "iOS",
          matched: false,
        },
        {
          title: "PostgreSQL",
          matched: false,
        },
        {
          title: "Swift",
          matched: false,
        },
      ],
    }),
    Ember.Object.create({
      createdAt: moment().subtract(3, 'days'),
      number: 26,
      postType: 'issue',
      title: "When signing up, there doesn't seem to be a GitHub option",
      user: {
        username: "githubber"
      },
      skills: [
        {
          title: "Rails",
          matched: true,
        },
        {
          title: "Ruby",
          matched: true,
        },
        {
          title: "Amazon S3",
          matched: false,
        },
        {
          title: "iOS",
          matched: false,
        },
        {
          title: "PostgreSQL",
          matched: false,
        },
        {
          title: "Swift",
          matched: false,
        },
      ],
    }),
  ]
});
