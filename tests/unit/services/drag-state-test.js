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
  assert.equal(service.get('isDragging'), false);
});

test('it sets dragging to false when leaving is called', function(assert) {
  let service = this.subject();
  service.set('isDragging', true);
  service.leaving();
  assert.equal(service.get('isDragging'), false);
});

test('it sets dragging to true when dragging is called', function(assert) {
  let service = this.subject();
  service.dragging();
  assert.equal(service.get('isDragging'), true);
});
