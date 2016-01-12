import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-details', 'Integration | Component | project details', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{project-details}}`);

  assert.equal(this.$('.project-details').length, 1);
});
