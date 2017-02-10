import { moduleFor, test } from 'ember-qunit';

moduleFor('service:code-theme', 'Unit | Service | code theme', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it is light by default', function(assert) {
  let service = this.subject();
  assert.ok(service.get('isLight'));
  assert.notOk(service.get('isDark'));
  assert.equal(service.get('className'), 'code-theme--light');
});

test('it changes to dark when toggled', function(assert) {
  let service = this.subject();
  service.toggle();
  assert.notOk(service.get('isLight'));
  assert.ok(service.get('isDark'));
  assert.equal(service.get('className'), 'code-theme--dark');
});
