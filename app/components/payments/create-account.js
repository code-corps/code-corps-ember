import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import moment from 'moment';

export default Component.extend({
  classNameBindings: ['statusClass'],
  classNames: ['create-account', 'account-setup__section'],

  status: computed('stripeConnectAccount.id', function() {
    let accountId = get(this, 'stripeConnectAccount.id');
    return isEmpty(accountId) ? 'required' : 'verified';
  }),

  statusClass: computed('status', function() {
    return `account-setup__section--${get(this, 'status')}`;
  }),

  actions: {
    submit() {
      let country = get(this, 'country');
      let tosAcceptanceDate = parseInt(moment.utc().format('X'));

      let onSubmit = get(this, 'onCreateStripeConnectAccount');
      onSubmit({ country, tosAcceptanceDate });
    }
  }
});
