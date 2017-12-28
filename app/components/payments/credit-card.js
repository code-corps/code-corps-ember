import Component from '@ember/component';
import { computed, get, getProperties } from '@ember/object';
import { alias, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { hasExpired, willExpire } from 'code-corps-ember/utils/expiration-date';

export default Component.extend({
  isEditing: false,
  isReplacing: false,
  month: null,
  year: 2017,

  creditCard: service(),
  stripev3: service(),

  cardOptions: alias('creditCard.cardOptions'),

  cardHasExpired: computed('card.expMonth', 'card.expYear', function() {
    let card = get(this, 'card');
    let { expMonth, expYear } = getProperties(card, 'expMonth', 'expYear');
    return hasExpired(expMonth, expYear);
  }),

  cardHasNotExpired: not('cardHasExpired'),

  cardWillExpire: computed('card.expMonth', 'card.expYear', function() {
    let card = get(this, 'card');
    let { expMonth, expYear } = getProperties(card, 'expMonth', 'expYear');
    return willExpire(expMonth, expYear, 1);
  }),

  expiresText: computed('cardHasExpired', 'cardWillExpire', function() {
    let { cardHasExpired, cardWillExpire }
      = getProperties(this, 'cardHasExpired', 'cardWillExpire');
    if (cardHasExpired) {
      return 'Expired ';
    } else if (cardWillExpire) {
      return 'Expires ';
    } else {
      return '';
    }
  }),

  actions: {
    onChange(element, { value }, nope) {
      console.log(value, nope);
    },

    replace(stripeElement) {
      console.log(stripeElement);
    },

    update() {
      let card = get(this, 'card');
      console.log(card);
      return card.save();
    }
  }
});
