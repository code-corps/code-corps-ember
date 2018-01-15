import { moduleFor, test } from 'ember-qunit';

moduleFor('service:site-footer', 'Unit | Service | site footer', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it shrinks and enlarges its size', function(assert) {
  let service = this.subject();
  assert.ok(service.get('isShrunken'), 'Is shrunken by default');
  service.enlarge();
  assert.notOk(service.get('isShrunken'), 'Is not shrunken after enlarging');
  service.shrink();
  assert.ok(service.get('isShrunken'), 'Is shrunken after shrinking');
});
