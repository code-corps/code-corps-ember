import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';

moduleForModel('comment', 'Unit | Model | comment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:task',
    'model:user',
    'model:comment-user-mention'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has all of its attributes', function(assert) {
  let comment = this.subject();
  let actualAttributes = Object.keys(comment.toJSON());
  let expectedAttributes = [
    "body",
    "insertedAt",
    "markdown",
    "task",
    "user",
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
