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

let mockStore = Service.extend({
  query() {
    return RSVP.resolve([]);
  }
});

let mockCurrentUser = Service.extend({
  user: {
    id: 1
  }
});

let mockComment = Object.create({
  body: 'A <strong>body</strong>',
  user: { id: 1 },
  save() {
    return RSVP.resolve();
  }
});

// let mockCommentWithMentions = Object.create({
//   body: '<p>Mentioning @user1 and @user2</p>',
//   user: { id: 1 },
//   save() {
//     return RSVP.resolve();
//   },
//   commentUserMentions: [
//     Object.create({ indices: [14, 19], username: 'user1', user: { id: 1 } }),
//     Object.create({ indices: [25, 30], username: 'user2', user: { id: 2 } })
//   ]
// });

moduleForComponent('comment-item', 'Integration | Component | comment item', {
  integration: true,
  beforeEach() {
    this.register('service:store', mockStore);
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.set('comment', mockComment);
  this.render(hbs`{{comment-item comment=comment}}`);

  assert.equal(this .$('.comment-item').length, 1, 'Component\' element is rendered');
});

test('it renders all required comment elements properly', function(assert) {
  assert.expect(4);

  let user = { id: 1, username: 'tester' };
  let comment = Object.create({ id: 1, body: 'A <b>comment</b>', user, containsCode: true });

  this.set('comment', comment);
  this.render(hbs`{{comment-item comment=comment}}`);

  assert.equal(this.$('.comment-item .comment-body').html(), 'A <b>comment</b>', 'The comment\'s body is rendered');
  assert.equal(this.$('.comment-item .comment-body b').length, 1, 'The comment\'s body is rendered unescaped');
  assert.equal(this.$('.comment-item .username').text().trim(), 'tester');
  assert.equal(this.$('.comment-item .code-theme-selector').length, 1);
});

test('it switches between editing and viewing mode', function(assert) {
  assert.expect(3);

  this.register('service:mention-fetcher', mockMentionFetcher);
  this.register('service:current-user', mockCurrentUser);

  this.set('comment', mockComment);
  this.render(hbs`{{comment-item comment=comment}}`);

  this.$('.edit').click();
  assert.equal(this.$('.comment-item.editing').length, 1, 'Component switched the UI to editing mode');
  this.$('.cancel').click();
  assert.equal(this.$('.comment-item.editing').length, 0, 'Component switched back the UI to view mode on cancel');
  this.$('.edit').click();
  this.$('.save').click();
  assert.equal(this.$('.comment-item.editing').length, 0, 'Component switched back the UI to view mode on save');
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/*
test('mentions are rendered on comment body in read-only mode', function(assert) {
  assert.expect(1);
  this.set('comment', mockCommentWithMentions);
  let expectedOutput = '<p>Mentioning <a href="/user1" class="username">@user1</a> and <a href="/user2" class="username">@user2</a></p>';
  this.render(hbs`{{comment-item comment=comment}}`);
  assert.equal(this.$('.comment-item .comment-body').html(), expectedOutput, 'Mentions are rendered');
});
*/
