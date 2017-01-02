import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['create-account', 'account-setup__section'],

  actions: {
    submit() {
      let country = get(this, 'country');
      let tosAcceptanceDate = Date.now();

      let onSubmit = get(this, 'onCreateStripeConnectAccount');
      onSubmit({ country, tosAcceptanceDate });
    }
  }
});
