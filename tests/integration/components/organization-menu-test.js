import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('organization-menu', 'Integration | Component | organization menu', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{organization-menu}}`);

  assert.equal(this .$('.organization-menu').length, 1, 'Component\'s element is rendered');
});


test('it renders all required menu elements properly', function(assert) {
  assert.expect(3);

  this.render(hbs`{{organization-menu}}`);

  assert.equal(this.$('.organization-menu li').length, 2, 'All the links rendered');
  assert.equal(this.$('.organization-menu li:eq(0)').text().trim(), 'Projects', 'The projects link is rendered');
  assert.equal(this.$('.organization-menu li:eq(1)').text().trim(), 'Settings', 'The settings link is rendered');
});
