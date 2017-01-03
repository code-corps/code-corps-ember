import Ember from 'ember';
import moment from 'moment';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['create-account', 'account-setup__section'],

  actions: {
    submit() {
      let country = get(this, 'country');
      let tosAcceptanceDate = parseInt(moment.utc().format('X'));

      let onSubmit = get(this, 'onCreateStripeConnectAccount');
      onSubmit({ country, tosAcceptanceDate });
    }
  }
});
