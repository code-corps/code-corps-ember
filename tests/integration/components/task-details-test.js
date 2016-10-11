import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  K,
  Object,
  RSVP,
  Service
} = Ember;

let mockMentionFetcher = Service.extend({
  fetchBodyWithMentions: RSVP.resolve,
  prefetchBodyWithMentions: K
});

let mockCurrentUser = Service.extend({
  user: {
    id: 1
  }
});

let mockStore = Service.extend({
  query() {
    return RSVP.resolve([]);
  }
});

let mockTask = Object.create({
  title: 'A task',
  body: 'A <strong>body</strong>',
  containsCode: true,
  taskType: 'issue',
  user: { id: 1 },
  save() {
    return RSVP.resolve();
  }
});

// let mockTaskWithMentions = Object.create({
//   title: 'A task with mentions',
//   body: '<p>Mentioning @user1 and @user2</p>',
//   save() {
//     return RSVP.resolve();
//   },
//   taskUserMentions: [
//     Object.create({ indices: [14, 19], username: 'user1', user: { id: 1 } }),
//     Object.create({ indices: [25, 30], username: 'user2', user: { id: 2 } })
//   ]
// });

moduleForComponent('task-details', 'Integration | Component | task details', {
  integration: true,
  beforeEach() {
    this.register('service:current-user', mockCurrentUser);
    this.register('service:store', mockStore);
  }
});

test('it renders', function(assert) {

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.render(hbs`{{task-details}}`);

  assert.equal(this.$('.task-details').length, 1, 'The component\'s element is rendered');
});

test('it renders all the ui elements properly bound', function(assert) {
  this.set('task', mockTask);

  let mockMentionFetcher = Service.extend({
    prefetchBodyWithMentions() {
      return 'A body';
    }
  });

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.render(hbs`{{task-details task=task}}`);

  assert.equal(this.$('.task-details .comment-body').text().trim(), 'A body', 'Body is correctly bound and rendered');
  assert.equal(this.$('.task-details .code-theme-selector').length, 1);
});

test('the task body is rendered as unescaped html', function(assert) {
  let mockMentionFetcher = Service.extend({
    prefetchBodyWithMentions() {
      return 'A body with a <strong>strong element</strong>';
    }
  });

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.set('task', mockTask);

  this.render(hbs`{{task-details task=task}}`);
  assert.equal(this.$('.task-details .comment-body strong').length, 1, 'A html element within the body element is rendered unescaped');
});

test('user can switch between view and edit mode for task body', function(assert) {
  assert.expect(3);
  this.set('task', mockTask);

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.render(hbs`{{task-details task=task}}`);
  assert.equal(this.$('.task-body .edit').length, 1, 'The edit button is rendered');

  this.$('.task-body .edit').click();
  assert.equal(this.$('.task-body .cancel').length, 1, 'The cancel button is rendered');

  this.$('.task-body .cancel').click();
  assert.equal(this.$('.task-body .edit').length, 1, 'The edit button is rendered');
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/*
test('mentions are rendered on task body in read-only mode', function(assert) {
  assert.expect(1);

  this.set('task', mockTaskWithMentions);

  let expectedOutput = '<p>Mentioning <a href="/user1" class="username">@user1</a> and <a href="/user2" class="username">@user2</a></p>';

  this.render(hbs`{{task-details task=task}}`);
  assert.equal(this.$('.task-body .comment-body').html(), expectedOutput, 'Mentions are rendered');
});
*/
