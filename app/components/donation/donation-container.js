import Ember from 'ember';

const {
  Component,
  computed: { bool }
} = Ember;

export default Component.extend({
  classNames: ['donation-container'],
  donationAmount: 0,
  projectTitle: null,

  canDonate: bool('projectTitle')
});
