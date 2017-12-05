import Component from '@ember/component';

export default Component.extend({
  projectTitle: 'Your Project Here',
  card: {
    brand: 'Visa',
    expMonth: '01',
    expYear: '2022',
    id: 1,
    last4: 4242
  },
  donateHandler() {},
  saveAndDonateHandler() {}

  /* BEGIN-FREESTYLE-USAGE donation--donation-container--notes
  ```
  import Component from '@ember/component';

  export default Component.extend({
    projectTitle: 'Your Project Here',
    card: {
      brand: 'Visa',
      expMonth: '01',
      expYear: '2022',
      id: 1,
      last4: 4242
    },
    donateHandler() {},
    saveAndDonateHandler() {}
  });
  ```
  END-FREESTYLE-USAGE */
});
