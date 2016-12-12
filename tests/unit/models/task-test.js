import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';

moduleForModel('task', 'Unit | Model | task', {
  // Specify the other units that are required for this test.
  needs: [
    'model:comment',
    'model:comment-user-mention',
    'model:project',
    'model:task-list',
    'model:task-user-mention',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('task', ['body', 'insertedAt', 'markdown', 'number', 'order', 'position', 'status', 'taskType', 'title']);
testForBelongsTo('task', 'project');
testForBelongsTo('task', 'taskList');
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
