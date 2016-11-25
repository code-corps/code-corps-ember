import Ember from 'ember';

const {
  Component,
  computed,
  computed: {
    and, gt, not, or
  }
} = Ember;

export default Component.extend({
  classNames: ['donation-container'],
  donationAmount: 0,
  projectTitle: null,

  canAddCard: computed('hasCard', 'isAddingCard', function() {
    let { hasCard, isAddingCard } = this.getProperties('hasCard', 'isAddingCard');
    return hasCard ? isAddingCard : true;
  }),
  canDonate: and('hasCard', 'isNotAddingCard'),

  hasCard: gt('cards.length', 0),
  hasNoCard: not('hasCard'),
  isNotAddingCard: not('isAddingCard'),

  showCardForm: or('hasNoCard', 'isAddingCard'),

  init() {
    this._super(...arguments);
    this.set('selectedCard', this.get('cards.firstObject'));
  },

  actions: {
    addCard() {
      this.set('isAddingCard', true);
    },

    selectCard(card) {
      this.set('selectedCard', card);
    }
  }
});
