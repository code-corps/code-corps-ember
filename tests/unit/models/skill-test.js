import { moduleForModel, test } from 'ember-qunit';

moduleForModel('skill', 'Unit | Model | skill', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
   let model = this.subject();
   let actualAttributes = Object.keys(model.toJSON());
   let expectedAttributes = [
     "description",
     "matched",
     "title",
   ];
 
   assert.hasAttributes(actualAttributes, expectedAttributes);
});
