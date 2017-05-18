import { moduleFor, test } from 'ember-qunit';
import Test from 'ember-simple-auth/authenticators/test';
import setupSession from 'ember-simple-auth/initializers/setup-session';
import setupSessionService from 'ember-simple-auth/initializers/setup-session-service';

moduleFor('service:github-state', 'Unit | Service | github state', {
  needs: ['service:session'],
  beforeEach() {
    this.register('authenticator:test', Test);
    setupSession(this.registry);
    setupSessionService(this.registry);
  }
});

test('validates a generated "state" as correct', function(assert) {
  assert.expect(1);

  let service = this.subject();
  let state = service.generate();

  assert.ok(service.validate(state), 'Validation passed.');
});

test('validates some random "state" as incorrect', function(assert) {
  assert.expect(1);

  let state = 'some random string';
  let service = this.subject();
  assert.notOk(service.validate(state), 'Validation failed.');
});

test('validates undefined and null as incorrect, even though stored state is also undefined', function(assert) {
  assert.expect(2);

  let service = this.subject();
  assert.notOk(service.validate(undefined), 'Validation failed for undefined.');
  assert.notOk(service.validate(null), 'Validation failed for null.');
});
