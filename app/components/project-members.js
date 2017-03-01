import Ember from 'ember';

const {
  Component,
  computed: { alias }
} = Ember;

export default Component.extend({
  classNames: ['project-members'],
  count: alias('users.length')
});
