import RSVP from 'rsvp';
import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task-details';

let mockMentionFetcher = {
  fetchBodyWithMentions: RSVP.resolve,
  prefetchBodyWithMentions() {}
};

let mockCurrentUser = {
  user: {
    id: 1
  }
};

let mockStore = {
  query() {
    return RSVP.resolve([]);
  }
};

let mockTask = {
  title: 'A task',
  body: 'A <strong>body</strong>',
  containsCode: true,
  user: { id: 1 },
  save() {
    return RSVP.resolve();
  }
};

// let mockTaskWithMentions = {
//   title: 'A task with mentions',
//   body: '<p>Mentioning @user1 and @user2</p>',
//   save() {
//     return RSVP.resolve();
//   },
//   taskUserMentions: [
//     { indices: [14, 19], username: 'user1', user: { id: 1 } },
//     { indices: [25, 30], username: 'user2', user: { id: 2 } }
//   ]
// });

let page = PageObject.create(component);

moduleForComponent('task-details', 'Integration | Component | task details', {
  integration: true,
  beforeEach() {
    stubService(this, 'current-user', mockCurrentUser);
    stubService(this, 'store', mockStore);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all the ui elements properly bound', function(assert) {
  this.set('task', mockTask);

  stubService(this, 'mention-fetcher', {
    prefetchBodyWithMentions() {
      return 'A body';
    }
  });

  this.render(hbs`{{task-details task=task}}`);

  assert.equal(page.commentBody.text, 'A body', 'Body is correctly bound and rendered');
  assert.ok(page.codeThemeSelector.isVisible);
});

test('the task body is rendered as unescaped html', function(assert) {
  stubService(this, 'mention-fetcher', {
    prefetchBodyWithMentions() {
      return 'A body with a <strong>strong element</strong>';
    }
  });

  this.set('task', mockTask);

  this.render(hbs`{{task-details task=task}}`);
  assert.ok(page.commentBody.hasStrongText, 'An html element within the body element is rendered unescaped');
});

test('user can switch between view and edit mode for task body', function(assert) {
  assert.expect(3);
  this.set('task', mockTask);

  stubService(this, 'mention-fetcher', mockMentionFetcher);

  this.render(hbs`{{task-details task=task}}`);
  assert.ok(page.edit.isVisible, 'The edit button is rendered');

  page.edit.click();
  assert.ok(page.cancel.isVisible, 'The cancel button is rendered');

  page.cancel.click();
  assert.ok(page.edit.isVisible, 'The edit button is rendered');
});

test('it saves', function(assert) {
  assert.expect(2);

  this.set('task', mockTask);
  stubService(this, 'mention-fetcher', {
    fetchBodyWithMentions(task) {
      return RSVP.resolve(task.body);
    },
    prefetchBodyWithMentions() {
      return 'A body';
    }
  });

  this.on('route-save', (task) => {
    set(task, 'body', 'A new body');
    return RSVP.resolve(task);
  });

  this.render(hbs`{{task-details task=task saveTask=(action 'route-save')}}`);
  assert.equal(page.commentBody.text, 'A body', 'The original body is correct');

  page.edit.click();
  page.editorWithPreview.textarea.fillIn('A new body');
  page.save.click();
  assert.equal(page.commentBody.text, 'A new body', 'The body is saved');
});

test('if the task body is null render the no description element', function(assert) {
  stubService(this, 'mention-fetcher', {
    prefetchBodyWithMentions() {
      return null;
    }
  });

  this.set('task', mockTask);

  this.render(hbs`{{task-details task=task}}`);
  assert.ok(page.nullCommentBody.isVisible, 'The message for no comment body is rendered');
});

test('if the task body is not null do not render the no description element', function(assert) {
  stubService(this, 'mention-fetcher', {
    prefetchBodyWithMentions() {
      return 'A body';
    }
  });

  this.set('task', mockTask);

  this.render(hbs`{{task-details task=task}}`);
  assert.notOk(page.nullCommentBody.isVisible, 'The message for no comment body is not rendered if there is data');
});
