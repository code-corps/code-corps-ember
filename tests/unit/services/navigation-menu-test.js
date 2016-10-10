import { moduleFor, test } from 'ember-qunit';

moduleFor('service:navigation-menu', 'Unit | Service | navigation menu', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it isDefault by default', function(assert) {
  assert.expect(2);

  let service = this.subject();

  assert.ok(service.get('isDefault'));
  assert.notOk(service.get('isOnboarding'));
});

test('it isOnboarding when the user is onboarding', function(assert) {
  assert.expect(2);

  let service = this.subject({
    onboarding: {
      isOnboarding: true
    }
  });

  assert.ok(service.get('isOnboarding'));
  assert.notOk(service.get('isDefault'));
});
