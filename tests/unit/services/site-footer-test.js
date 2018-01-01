import { moduleFor, test } from 'ember-qunit';

moduleFor('service:site-footer', 'Unit | Service | site footer', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it reduces and enlarges its size', function(assert) {
  let service = this.subject();
  assert.ok(service.get('isReduced'), 'Is reduced by default');
  service.enlarge();
  assert.notOk(service.get('isReduced'), 'Is not reduced after enlarging');
  service.reduce();
  assert.ok(service.get('isReduced'), 'Is reduced after reducing');
});
