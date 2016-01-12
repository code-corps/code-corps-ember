import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('member-details', 'Integration | Component | member details', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{member-details}}`);
  assert.equal(this.$('.member-details').length, 1);
});
