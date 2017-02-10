import { moduleFor, test } from 'ember-qunit';

moduleFor('service:drag-state', 'Unit | Service | drag state', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it is not dragging by default', function(assert) {
  let service = this.subject();
  assert.notOk(service.get('isDragging'));
});

test('it sets dragging to false when leaving is called', function(assert) {
  let service = this.subject();
  service.set('isDragging', true);
  service.leaving();
  assert.notOk(service.get('isDragging'));
});

test('it sets dragging to true when dragging is called', function(assert) {
  let service = this.subject();
  service.dragging();
  assert.ok(service.get('isDragging'));
});
