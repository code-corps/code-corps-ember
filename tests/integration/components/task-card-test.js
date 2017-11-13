import RSVP from 'rsvp';
import { setProperties, set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import taskCardComponent from 'code-corps-ember/tests/pages/components/task-card';
import moment from 'moment';
import { Ability } from 'ember-can';
import DS from 'ember-data';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import { initialize as initializeKeyboard } from 'ember-keyboard';

const { PromiseObject } = DS;

let page = PageObject.create(taskCardComponent);

function renderPage() {
  page.render(hbs`
    {{task-card
      clickedTask=clickedTask
      keyboardActivated=keyboardActivated
      task=task
      taskUser=taskUser
      users=users
    }}`);
}

function setHandler(context, clickedTaskHandler = function() {}) {
  set(context, 'clickedTaskHandler', clickedTaskHandler);
}

moduleForComponent('task-card', 'Integration | Component | task card', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    setHandler(this);
    this.register('ability:task', Ability.extend({ canReposition: true }));
    initializeKeyboard();
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all the required elements', function(assert) {
  assert.expect(3);

  let task = {
    createdAt: moment().subtract(2, 'days'),
    number: 1,
    title: 'Clean the house'
  };

  set(this, 'task', task);
  renderPage();

  assert.equal(page.number.text, '#1', 'The number renders');
  assert.equal(page.time.text, '2 days ago', 'The time renders');
  assert.equal(page.title.text, 'Clean the house', 'The title renders');
});

test('it renders a pull request icon if associated to a pull request', function(assert) {
  assert.expect(1);

  let task = { githubPullRequest: { id: 'foo' } };

  set(this, 'task', task);
  renderPage();

  assert.ok(page.pullRequestIcon.isVisible, 'The pull request icon renders');
});

test('it does not render a pull request icon if not associated to a pull request', function(assert) {
  assert.expect(1);

  let task = { githubPullRequest: null };

  set(this, 'task', task);
  renderPage();

  assert.notOk(page.pullRequestIcon.isVisible, 'The pull request icon does not render');
});

test('it can reposition if it has the ability', function(assert) {
  assert.expect(1);
  this.register('ability:task', Ability.extend({ canReposition: true }));

  renderPage();

  assert.ok(page.canReposition, 'Can reposition');
});

test('it cannot reposition if it does not have the ability', function(assert) {
  assert.expect(1);
  this.register('ability:task', Ability.extend({ canReposition: false }));

  renderPage();

  assert.notOk(page.canReposition, 'Cannot reposition');
});

test('it renders the GitHub issue link icon if it has an issue and is hovering', function(assert) {
  assert.expect(1);
  let isLoaded = true;
  let task = { githubIssue: { isLoaded }, githubRepo: { isLoaded } };
  set(this, 'task', task);
  renderPage();
  page.mouseenter();
  assert.ok(page.issueLink.isVisible, 'The GitHub issue link is visible');
});

test('it does not render the GitHub issue link icon if it does not have an issue and is hovering', function(assert) {
  assert.expect(1);
  let task = { githubIssue: null };
  set(this, 'task', task);
  renderPage();
  page.mouseenter();
  assert.notOk(page.issueLink.isVisible, 'The GitHub issue link is not visible');
});

test('it sends action if clicked and not loading', function(assert) {
  assert.expect(1);

  let task = {
    isLoading: false,
    number: 1
  };

  set(this, 'clickedTask', function(clickedTask) {
    assert.deepEqual(clickedTask, task);
  });
  set(this, 'task', task);

  renderPage();
  page.click();
});

test('it does not send action if clicked and loading', function(assert) {
  assert.expect(1);

  let task = {
    isLoading: true,
    number: 1
  };

  set(this, 'clickedTask', function() {
    assert.notOk();
  });
  set(this, 'task', task);

  renderPage();
  page.click();
  assert.ok(true);
});

test('assignment works if user has ability and card is hovered', function(assert) {
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

  renderPage();

  page.mouseenter();
  page.taskAssignment.select.trigger.open();
  page.taskAssignment.select.dropdown.options(0).select();
});

test('unassignment works if user has ability and card is hovered', function(assert) {
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

  renderPage();

  page.mouseenter();
  page.taskAssignment.select.trigger.open();
  page.taskAssignment.select.dropdown.options(0).select();
});

test('assignment dropdown renders if user has ability and card is hovered', function(assert) {
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

  renderPage();

  page.mouseenter();
  page.taskAssignment.select.trigger.open();
  assert.equal(page.taskAssignment.select.dropdown.options(0).text, 'testuser1', 'First user is rendered.');
  assert.equal(page.taskAssignment.select.dropdown.options(1).text, 'testuser2', 'Second user is rendered.');
});

test('assignment dropdown renders when records are still being loaded and card  is hovered', function(assert) {
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

  renderPage();

  page.mouseenter();
  RSVP.all(users).then(() => {
    page.taskAssignment.select.trigger.open();
    assert.equal(page.taskAssignment.select.dropdown.options(0).text, 'testuser1', 'First user is rendered.');
    assert.equal(page.taskAssignment.select.dropdown.options(1).text, 'testuser2', 'Second user is rendered.');
    done();
  });
});

test('assignment dropdown does not render if user has no ability and card is hovered', function(assert) {
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

  renderPage();

  page.mouseenter();
  assert.notOk(page.taskAssignment.select.triggerRenders, 'Dropdown trigger for assignment does not render.');
  page.taskAssignment.assignedUser.as((user) => {
    assert.equal(user.icon.url, 'test.png');
  });
});

test('it archives task when hovering and pressing C key', function(assert) {
  let done = assert.async();
  assert.expect(1);

  let task = {
    archived: false,
    save() {
      return this;
    },
    then() {
      assert.ok(true, 'Task save was called');
      done();
    }
  };

  set(this, 'task', task);
  this.register('ability:task', Ability.extend({ canArchive: true }));

  renderPage();

  page.mouseenter();
  page.triggerKeyDown('KeyC');
});

test('it does not archive task when not hovering and pressing C key', function(assert) {
  assert.expect(1);

  let task = {
    archived: false,
    save() {
      return this;
    },
    then() {
      assert.notOk(true);
    }
  };

  set(this, 'task', task);
  this.register('ability:task', Ability.extend({ canArchive: true }));
  set(this, 'keyboardActivated', true); // manually activate the keyboard

  renderPage();

  page.triggerKeyDown('KeyC');
  assert.ok(true);
});

test('it does not archive task when left hovering and pressing C key', function(assert) {
  assert.expect(1);

  let task = {
    archived: false,
    save() {
      return this;
    },
    then() {
      assert.notOk(true);
    }
  };

  set(this, 'task', task);
  this.register('ability:task', Ability.extend({ canArchive: true }));

  renderPage();

  page.mouseenter();
  page.mouseleave();
  page.triggerKeyDown('KeyC');
  assert.ok(true);
});

test('it does not archive task when the user does not have the ability', function(assert) {
  assert.expect(1);

  let task = {
    archived: false,
    save() {
      return this;
    },
    then() {
      assert.notOk(true);
    }
  };

  set(this, 'task', task);
  this.register('ability:task', Ability.extend({ canArchive: false }));

  renderPage();

  page.mouseenter();
  page.triggerKeyDown('KeyC');
  assert.ok(true);
});
