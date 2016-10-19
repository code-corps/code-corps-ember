import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('task', 'Unit | Model | task', {
  // Specify the other units that are required for this test.
  needs: [
    'model:comment',
    'model:comment-user-mention',
    'model:project',
    'model:task-user-mention',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.store().modelFor('task');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'body',
    'insertedAt',
    'likesCount',
    'markdown',
    'number',
    'status',
    'taskType',
    'title'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForBelongsTo('task', 'project');
testForBelongsTo('task', 'user');
testForHasMany('task', 'comments');
testForHasMany('task', 'commentUserMentions');
testForHasMany('task', 'taskUserMentions');

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
