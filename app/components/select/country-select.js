import Component from '@ember/component';

export default Component.extend({
  classNames: ['select-country'],
  countryOptions: [
    { name: 'United States', id: 'US' }
  ]
});
