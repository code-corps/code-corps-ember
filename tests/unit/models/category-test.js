import { moduleForModel, test } from 'ember-qunit';
import { testForHasMany } from '../../helpers/relationship';

moduleForModel('category', 'Unit | Model | category', {
  // Specify the other units that are required for this test.
  needs: ['model:user-category', 'model:project-category']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all its attributes', function(assert) {
  assert.expect(3);

  const category = this.subject();
  const attributes = Object.keys(category.toJSON());

  assert.ok(attributes.includes('description'), 'should have description attribute');
  assert.ok(attributes.includes('name'), 'should have name attribute');
  assert.ok(attributes.includes('slug'), 'should have slug attribute');
});

testForHasMany('category', 'projectCategories');
testForHasMany('category', 'userCategories');
