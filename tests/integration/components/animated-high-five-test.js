import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('animated-high-five', 'Integration | Component | animated high five', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{animated-high-five}}`);

  assert.equal(this.$().text().trim(), '');
});
