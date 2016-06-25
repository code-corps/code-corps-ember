import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('progress-bar', 'Integration | Component | progress bar', {
  integration: true
});

test('it sets the style when percentage is set', function(assert) {
  this.render(hbs`{{progress-bar percentage=100}}`);

  assert.equal(this.$('.progress-bar').attr('style'), 'width: 100%;');
});

test('it sets the style when no percentage is set', function(assert) {
  this.render(hbs`{{progress-bar}}`);

  assert.equal(this.$('.progress-bar').attr('style'), 'width: 0%;');
});
