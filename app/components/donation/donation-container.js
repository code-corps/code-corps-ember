import Ember from 'ember';

const {
  Component,
  computed,
  computed: {
    and, empty, not, or
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

  hasCard: not('hasNoCard'),
  hasNoCard: empty('card'),
  isNotAddingCard: not('isAddingCard'),

  showCardForm: or('hasNoCard', 'isAddingCard'),

  actions: {
    addCard() {
      this.set('isAddingCard', true);
    }
  }
});
