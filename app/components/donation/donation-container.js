import Component from '@ember/component';
import { alias, and, empty, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['donation-container'],

  donationAmount: 0,
  projectTitle: null,
  wasNewCard: true,

  creditCard: service(),

  cardOptions: alias('creditCard.cardOptions'),
  /**
   * If there is no card for the user, this might be an ObjectProxy
   * that has `null` content. This `card.id` approach was the least
   * hacky way we could think to deal with this late one night.
   *
   * TODO: Find a better approach!
   */
  isNewCard: empty('card.id'),
  shouldShowNewForm: or('isNewCard', 'subscribingWithNewCard'),
  subscribingWithNewCard: and('isProcessing', 'wasNewCard'),

  init() {
    this._super(...arguments);
    this.set('wasNewCard', this.get('isNewCard'));
  }
});
