import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('comment', 'Unit | Model | comment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:comment-user-mention',
    'model:task',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has all of its attributes', function(assert) {
  let model = this.store().modelFor('comment');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'body',
    'insertedAt',
    'markdown'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForBelongsTo('comment', 'task');
testForBelongsTo('comment', 'user');
testForHasMany('comment', 'commentUserMentions');

test('it correctly identifies code in the body', function(assert) {
  assert.expect(1);

  let model = this.subject({ body: '<code>Hello, world!<code>' });

  assert.equal(model.get('containsCode'), true);
});

test('it correctly identifies lack of code in the body', function(assert) {
  assert.expect(1);

  let model = this.subject({ body: '<pre>Hello, world!<pre>' });

  assert.equal(model.get('containsCode'), false);
});
