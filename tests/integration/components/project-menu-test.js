import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-menu', 'Integration | Component | project menu', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{project-menu}}`);

  assert.equal(this .$('.project-menu').length, 1, 'Component\' element is rendered');
});


test('it renders all required menu elements properly', function(assert) {
  assert.expect(2);

  this.render(hbs`{{project-menu}}`);

  assert.equal(this.$('.project-menu li:eq(0)').text().trim(), 'About', 'The about link is rendered');
  assert.equal(this.$('.project-menu li:eq(1)').text().trim(), 'Posts', 'The posts link is rendered');
});
