import { moduleForModel, test } from 'ember-qunit';
import { testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('category', 'Unit | Model | category', {
  // Specify the other units that are required for this test.
  needs: [
    'model:project-category',
    'model:user-category'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all its attributes', function(assert) {
  let model = this.store().modelFor('category');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'description',
    'name',
    'slug'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForHasMany('category', 'projectCategories');
testForHasMany('category', 'userCategories');
