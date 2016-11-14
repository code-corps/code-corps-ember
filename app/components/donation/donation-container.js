import Ember from 'ember';

const {
  Component,
  computed,
  computed: {
    and, gt, not
  }
} = Ember;

export default Component.extend({
  classNames: ['donation-container'],
  donationAmount: 0,
  projectTitle: null,

  canAddCard: computed('hasCards', 'isAddingCard', function() {
    let { hasCards, isAddingCard } = this.getProperties('hasCards', 'isAddingCard');
    return hasCards ? isAddingCard : true;
  }),
  canDonate: and('hasCards', 'isNotAddingCard'),
  canShowCardList: and('hasCards', 'isNotAddingCard'),
  hasCards: gt('cards.length', 0),
  hasNoCards: not('hasCards'),
  isNotAddingCard: not('isAddingCard')
});
