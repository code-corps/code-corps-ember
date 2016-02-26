import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('organization-settings-menu', 'Integration | Component | organization settings menu', {
  integration: true
});

test('it renders with all its required elements', function(assert) {
  assert.expect(3);

  this.render(hbs`{{organization-settings-menu}}`);

  assert.equal(this.$('.organization-settings-menu').length, 1, 'The component itself renders');
  assert.equal(this.$('li').length, 1, 'All the menu items render');
  assert.equal(this.$('li:eq(0) a').text().trim(), "Organization Profile", 'The profile link render');
});
