import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';

moduleForModel('task', 'Unit | Model | task', {
  // Specify the other units that are required for this test.
  needs: [
    'model:comment',
    'model:comment-user-mention',
    'model:github-repo',
    'model:project',
    'model:task-list',
    'model:task-skill',
    'model:task-user-mention',
    'model:user',
    'model:user-task'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('task', ['body', 'insertedAt', 'markdown', 'number', 'order', 'position', 'status', 'title']);
testForBelongsTo('task', 'githubRepo');
testForBelongsTo('task', 'project');
testForBelongsTo('task', 'taskList');
testForBelongsTo('task', 'user');
testForHasMany('task', 'comments');
testForHasMany('task', 'commentUserMentions');
testForHasMany('task', 'taskSkills');
testForHasMany('task', 'taskUserMentions');

test('it correctly identifies code in the body', function(assert) {
  assert.expect(1);

  let model = this.subject({ body: '<code>Hello, world!<code>' });

  assert.ok(model.get('containsCode'));
});

test('it correctly identifies lack of code in the body', function(assert) {
  assert.expect(1);

  let model = this.subject({ body: '<pre>Hello, world!<pre>' });

  assert.notOk(model.get('containsCode'));
});
