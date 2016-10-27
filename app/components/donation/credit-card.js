import Ember from 'ember';

const {
  Component,
  computed: { not }
} = Ember;

export default Component.extend({
  classNames: ['credit-card-form'],
  canDonate: true,
  cannotDonate: not('canDonate')
});
