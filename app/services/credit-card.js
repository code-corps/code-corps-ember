import Service from '@ember/service';

export default Service.extend({
  cardOptions: {
    hidePostalCode: true,

    // Other styles are in `app/styles/addons/ember-stripe-elements`
    style: {
      base: {
        color: '#333',
        fontFamily: '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '14px',
        '::placeholder': {
          color: '#666'
        },
        lineHeight: '24px'
      },
      invalid: {
        color: '#C0392B',
        iconColor: '#C0392B'
      }
    }
  }
});
