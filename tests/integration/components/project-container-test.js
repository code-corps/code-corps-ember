import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-container', 'Integration | Component | project container', {
  integration: true
});

test('it renders properly', function(assert) {
  assert.expect(2);

  this.render(hbs`{{project-container}}`);

  assert.equal(this.$('.project-details').length, 1, 'The details render');
  assert.equal(this.$('.project-menu').length, 1, 'The menu renders');
});
