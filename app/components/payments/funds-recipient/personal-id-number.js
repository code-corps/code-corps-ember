import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['personal-id-number'],
  tagName: 'section',

  status: alias('stripeConnectAccount.personalIdNumberStatus')
});
