import RSVP from 'rsvp';
import { setProperties } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import taskAssignmentComponent from 'code-corps-ember/tests/pages/components/task-assignment';
import { Ability } from 'ember-can';
import DS from 'ember-data';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import { initialize as initializeKeyboard } from 'ember-keyboard';

const { PromiseObject } = DS;

let page = PageObject.create(taskAssignmentComponent);

moduleForComponent('task-assignment', 'Integration | Component | task assignment', {
  integration: true,
  beforeEach() {
    initializeKeyboard();
    page.setContext(this);
    this.register('ability:task', Ability.extend({ canReposition: true }));
  },
  afterEach() {
    page.removeContext();
  }
});

test('assignment works if user has ability', function(assert) {
  let done = assert.async();
  assert.expect(2);

  let task = { id: 'task' };
  let user = { id: 'user', username: 'testuser' };
  let users = [user];

  setProperties(this, { task, users });

  stubService(this, 'current-user', { user });

  stubService(this, 'task-assignment', {
    assign(sentTask, sentUser) {
      assert.deepEqual(sentTask, task, 'Correct task was sent.');
      assert.deepEqual(sentUser, user, 'Correct user was sent.');
      // this is the final step of the async behavior, so we are `done()` here
      done();
      return RSVP.resolve();
    }
  });

  this.register('ability:task', Ability.extend({ canAssign: true }));

  this.render(hbs`{{task-assignment task=task users=users}}`);

  page.select.trigger.open();
  page.select.dropdown.options.objectAt(0).select();
});

test('unassignment works if user has ability', function(assert) {
  let done = assert.async();
  assert.expect(1);

  let task = { id: 'task' };
  let user = { id: 'user', username: 'testuser' };
  let users = [user];
  let taskUser = user;

  setProperties(this, { task, users, taskUser });

  stubService(this, 'task-assignment', {
    unassign(sentTask) {
      assert.deepEqual(sentTask, task, 'Correct task was sent.');
      // this is the final step of the async behavior, so we are `done()` here
      done();
      return RSVP.resolve();
    }
  });

  this.register('ability:task', Ability.extend({ canAssign: true }));

  this.render(hbs`{{task-assignment task=task taskUser=taskUser users=users}}`);

  page.select.trigger.open();
  page.select.dropdown.options.objectAt(0).select();
});

test('assignment dropdown renders if user has ability', function(assert) {
  assert.expect(2);

  let task = { id: 'task' };
  let user1 = { id: 'user1', username: 'testuser1' };
  let user2 = { id: 'user2', username: 'testuser2' };
  let users = [user1, user2];

  setProperties(this, { task, users });

  stubService(this, 'task-assignment', {
    isAssignedTo() {
      return RSVP.resolve(false);
    }
  });

  this.register('ability:task', Ability.extend({ canAssign: true }));

  this.render(hbs`{{task-assignment task=task users=users}}`);

  page.select.trigger.open();
  assert.equal(page.select.dropdown.options.objectAt(0).text, 'testuser1', 'First user is rendered.');
  assert.equal(page.select.dropdown.options.objectAt(1).text, 'testuser2', 'Second user is rendered.');
});

test('assignment dropdown renders when records are still being loaded', function(assert) {
  let done = assert.async();
  assert.expect(2);

  let task = { id: 'task' };
  let user1 = { id: 'user1', username: 'testuser1' };
  let user2 = { id: 'user2', username: 'testuser2' };

  // this function wraps an object into a structure which simulates a DS records
  // which is in the process of being fetched from the server, meaning that it
  // will have an id, but all other properties will be delegated to the as of
  // yet not populated `content` property
  function proxify(user) {
    let promise = RSVP.resolve(user);
    let { id } = user;
    return PromiseObject.create({ id, promise });
  }

  let users = [user1, user2].map((user) => proxify(user));

  setProperties(this, { task, users });

  this.register('ability:task', Ability.extend({ canAssign: true }));

  this.render(hbs`{{task-assignment task=task users=users}}`);

  RSVP.all(users).then(() => {
    page.select.trigger.open();
    assert.equal(page.select.dropdown.options.objectAt(0).text, 'testuser1', 'First user is rendered.');
    assert.equal(page.select.dropdown.options.objectAt(1).text, 'testuser2', 'Second user is rendered.');
    done();
  });
});

test('assignment dropdown does not render if user has no ability', function(assert) {
  assert.expect(2);

  let task = { id: 'task' };
  let user1 = { id: 'user1', username: 'testuser1' };
  let user2 = {
    id: 'user2',
    username: 'testuser2',
    photoThumbUrl: 'test.png'
  };
  let users = [user1, user2];

  setProperties(this, { task, users, taskUser: user2 });

  stubService(this, 'task-assignment', {
    isAssignedTo() {
      return RSVP.resolve(false);
    }
  });

  this.register('ability:task', Ability.extend({ canAssign: false }));

  this.render(hbs`{{task-assignment task=task taskUser=taskUser users=users}}`);

  assert.notOk(page.select.triggerRenders, 'Dropdown trigger for assignment does not render.');
  page.assignedUser.as((user) => {
    assert.equal(user.icon.url, 'test.png');
  });
});

test('when rendering is deffered and user does not have ability and no assigned user', function(assert) {
  assert.expect(3);

  let task = { id: 'task' };

  this.register('ability:task', Ability.extend({ canAssign: false }));

  setProperties(this, { task, deferredRendering: true });

  this.render(hbs`{{task-assignment deferredRendering=deferredRendering task=task}}`);

  assert.notOk(page.select.triggerRenders, 'Dropdown trigger for assignment does not render.');
  assert.notOk(page.assignedUser.isVisible, 'Assigned user does not render.');
  assert.notOk(page.unselectedItem.isVisible, 'Unselected item does not render.');
});

test('when rendering is deffered and user has ability and no assigned user', function(assert) {
  assert.expect(3);

  let task = { id: 'task' };

  this.register('ability:task', Ability.extend({ canAssign: true }));

  setProperties(this, { task, deferredRendering: true });

  this.render(hbs`{{task-assignment deferredRendering=deferredRendering task=task}}`);

  assert.notOk(page.select.triggerRenders, 'Dropdown trigger for assignment does not render.');
  assert.notOk(page.assignedUser.isVisible, 'Assigned user does not render.');
  assert.ok(page.unselectedItem.isVisible, 'Unselected item renders.');
});

test('when rendering is deffered and user does not have ability and there is an assigned user', function(assert) {
  assert.expect(4);

  let task = { id: 'task' };

  let user1 = {
    id: 'user1',
    username: 'testuser1',
    photoThumbUrl: 'test.png'
  };

  setProperties(this, { task, taskUser: user1, deferredRendering: true });

  this.register('ability:task', Ability.extend({ canAssign: false }));

  this.render(hbs`{{task-assignment deferredRendering=deferredRendering task=task taskUser=taskUser}}`);

  assert.notOk(page.select.triggerRenders, 'Dropdown trigger for assignment does not render.');
  assert.ok(page.assignedUser.isVisible, 'Assigned user renders.');
  assert.notOk(page.unselectedItem.isVisible, 'Unselected item does not render.');
  page.assignedUser.as((user) => {
    assert.equal(user.icon.url, 'test.png');
  });
});

test('assignment dropdown typeahead', function(assert) {
  assert.expect(2);

  let task = { id: 'task' };
  let user1 = { id: 'user1', username: 'testuser1' };
  let user2 = { id: 'user2', username: 'testuser2' };
  let users = [user1, user2];

  setProperties(this, { task, users });

  stubService(this, 'task-assignment', {
    isAssignedTo() {
      return RSVP.resolve(false);
    }
  });
  stubService(this, 'store', {
    query(type, queryParams) {
      assert.deepEqual(queryParams, { query: 'testuser2' });
      return RSVP.resolve([user2]);
    }
  });

  this.register('ability:task', Ability.extend({ canAssign: true }));

  this.render(hbs`{{task-assignment task=task users=users}}`);

  page.select.trigger.open();
  page.select.dropdown.input.fillIn('testuser2');

  assert.equal(page.select.dropdown.options.objectAt(0).text, 'testuser2', 'Only the second user is rendered.');
});

test('pressing Space assigns self to task when able', function(assert) {
  let done = assert.async();
  assert.expect(2);

  let canTriggerAssignment = true;
  let task = { id: 'task' };
  let user = { id: 'user', username: 'testuser' };
  let users = [user];

  setProperties(this, { canTriggerAssignment, task, users });

  stubService(this, 'current-user', { user });

  stubService(this, 'task-assignment', {
    assign(sentTask, sentUser) {
      assert.deepEqual(sentTask, task, 'Correct task was sent.');
      assert.deepEqual(sentUser, user, 'Correct user was sent.');
      done();
      return RSVP.resolve();
    }
  });

  this.register('ability:task', Ability.extend({ canAssign: true }));

  this.render(hbs`{{task-assignment canTriggerAssignment=canTriggerAssignment task=task users=users}}`);

  page.triggerKeyDown('Space');
});

test('pressing Space unassigns self from task when able', function(assert) {
  let done = assert.async();
  assert.expect(1);

  let canTriggerAssignment = true;
  let task = { id: 'task' };
  let user = { id: 'user', username: 'testuser' };
  let users = [user];
  let taskUser = user;

  setProperties(this, { canTriggerAssignment, task, taskUser, users });

  stubService(this, 'current-user', { user });

  stubService(this, 'task-assignment', {
    unassign(sentTask) {
      assert.deepEqual(sentTask, task, 'Correct task was sent.');
      done();
      return RSVP.resolve();
    }
  });

  this.register('ability:task', Ability.extend({ canAssign: true }));

  this.render(hbs`{{task-assignment
    canTriggerAssignment=canTriggerAssignment
    task=task
    taskUser=taskUser
    users=users}}`
  );

  page.triggerKeyDown('Space');
});

test('pressing A when the user has ability', function(assert) {
  assert.expect(2);

  this.register('ability:task', Ability.extend({ canAssign: true }));

  let canTriggerAssignment = true;
  let task = { id: 'task' };
  setProperties(this, { canTriggerAssignment, task });

  this.render(hbs`{{task-assignment canTriggerAssignment=canTriggerAssignment task=task}}`);

  page.triggerKeyDown('KeyA');
  assert.ok(page.select.dropdown.isVisible, 'Dropdown renders.');
  page.triggerKeyDown('KeyA');
  assert.ok(page.select.dropdown.isVisible, 'Dropdown stays rendered.');
});

test('pressing A when the user does not have ability', function(assert) {
  assert.expect(1);

  this.register('ability:task', Ability.extend({ canAssign: false }));

  let canTriggerAssignment = true;
  let task = { id: 'task' };
  setProperties(this, { canTriggerAssignment, task });

  this.render(hbs`{{task-assignment canTriggerAssignment=canTriggerAssignment task=task}}`);

  page.triggerKeyDown('KeyA');
  assert.notOk(page.select.dropdown.isVisible, 'Dropdown does not render.');
});
