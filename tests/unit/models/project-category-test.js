import { moduleForModel, test } from 'ember-qunit';

moduleForModel('project-category', 'Unit | Model | project category', {
  // Specify the other units that are required for this test.
  needs: ['model:project', 'model:category']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
