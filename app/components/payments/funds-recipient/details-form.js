import Ember from 'ember';

const {
  assign,
  Component,
  computed: { equal },
  get,
  getProperties,
  set
} = Ember;

const BUSINESS_PROPERTIES = ['businessName', 'businessEin'];

const INDIVIDUAL_PROPERTIES = [
  'recipientType',
  'firstName', 'lastName',
  'dobDay', 'dobMonth', 'dobYear',
  'address1', 'address2', 'city', 'state', 'zip', 'country',
  'ssnLast4'
];

export default Component.extend({
  classNames: ['details-form'],
  tagName: 'section',

  isBusiness: equal('recipientType', 'business'),
  isIndividual: equal('recipientType', 'individual'),

  init() {
    let recipientType = get(this, 'stripeConnnectAccount.recipientType') || 'individual';
    set(this, 'recipientType', recipientType);
    this._super(...arguments);
  },

  actions: {
    submit() {
      let details = this._collectIndividualProperties();

      if (get(this, 'isBusiness')) {
        assign(details, this._collectBusinessProperties());
      }

      let onSubmit = get(this, 'onSubmit');
      onSubmit(details);
    }
  },

  _collectBusinessProperties() {
    return getProperties(this, ...BUSINESS_PROPERTIES);
  },

  _collectIndividualProperties() {
    return getProperties(this, ...INDIVIDUAL_PROPERTIES);
  }
});
