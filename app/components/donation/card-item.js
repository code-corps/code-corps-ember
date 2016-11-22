import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['card-item'],
  classNameBindings: ['isSelected:card-item--selected'],

  isSelected: computed('card', 'selectedCard', function() {
    return this.get('card.id') === this.get('selectedCard.id');
  }),

  selectedCard: null
});
