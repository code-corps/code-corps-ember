import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('progress-bar', 'Integration | Component | progress bar', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{progress-bar percentage=100}}`);

  assert.equal(this.$('.progress-bar-container').length, 1);
  assert.equal(this.$('.progress-bar').attr('style'), 'width: 100%;');
});
