import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

moduleForComponent('organization-settings', 'Integration | Component | organization settings', {
  integration: true
});

test('it renders properly', function(assert) {
  assert.expect(2);

  stubService(this, 'store');
  stubService(this, 'session');
  stubService(this, 'credentials');

  this.render(hbs`{{organization-settings}}`);

  assert.equal(this.$('.organization-header').length, 1, 'The header renders');
  assert.equal(this.$('.organization-menu').length, 1, 'The menu renders');
});
