import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['select-country'],
  countryOptions: [
    { name: 'United States', id: 'US' }
  ]
});
