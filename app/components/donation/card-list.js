import Ember from 'ember';

const {
  Component,
  computed: { alias, empty }
} = Ember;

export default Component.extend({
  classNames: ['card-list'],

  cardNotSelected: empty('selectedCard'),
  donationDisabled: alias('cardNotSelected'),

  selectedCard: null
});
