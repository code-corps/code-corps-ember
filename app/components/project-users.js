import Ember from 'ember';

const {
  Component,
  computed: { alias }
} = Ember;

export default Component.extend({
  classNames: ['project-users'],
  count: alias('users.length')
});
