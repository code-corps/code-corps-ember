import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';

moduleForModel('task', 'Unit | Model | task', {
  // Specify the other units that are required for this test.
  needs: [
    'model:project',
    'model:user',
    'model:comment',
    'model:comment-user-mention',
    'model:task-user-mention'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  assert.expect(8);

  let task = this.subject();
  let attributes = Object.keys(task.toJSON());

  assert.ok(attributes.includes('body'), 'task should have the body attribute');
  assert.ok(attributes.includes('insertedAt'), 'task should have the insertedAt attribute');
  assert.ok(attributes.includes('likesCount'), 'task should have the likesCount attribute');
  assert.ok(attributes.includes('markdown'), 'task should have the markdown attribute');
  assert.ok(attributes.includes('number'), 'task should have the number attribute');
  assert.ok(attributes.includes('status'), 'task should have the status attribute');
  assert.ok(attributes.includes('taskType'), 'task should have the taskType attribute');
  assert.ok(attributes.includes('title'), 'task should have the title attribute');
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
