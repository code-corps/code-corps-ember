import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let mockStore = Ember.Service.extend({
  query () {
    return Ember.RSVP.resolve([]);
  }
});

let mockStoreReturningMentions = Ember.Service.extend({
  query () {
    return Ember.RSVP.resolve([
      Ember.Object.create({ indices: [14, 19], username: 'user1', user: { id: 1 } }),
      Ember.Object.create({ indices: [25, 30], username: 'user2', user: { id: 2 } })
    ]);
  }
});

let mockSession = Ember.Service.extend({
  isAuthenticated: true,
  session: {
    authenticated: {
      user_id: 1
    }
  }
});

let mockComment = Ember.Object.create({
  body: 'A <strong>body</strong>',
  user: { id: 1 },
  save() {
    return Ember.RSVP.resolve();
  }
});

let mockCommentWithMentions = Ember.Object.create({
  body: '<p>Mentioning @user1 and @user2</p>',
  user: { id: 1 },
  save() {
    this.set('bodyPreview', this.get('body'));
    return Ember.RSVP.resolve();
  }
});

moduleForComponent('comment-item', 'Integration | Component | comment item', {
  integration: true,
  beforeEach() {
    this.container.registry.register('service:store', mockStore);
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{comment-item}}`);

  assert.equal(this .$('.comment-item').length, 1, 'Component\' element is rendered');
});

test('it renders all required comment elements properly', function(assert) {
  assert.expect(3);

  let user = { id: 1, username: 'tester' };
  let comment = Ember.Object.create({ id: 1, body: 'A <b>comment</b>', user: user });

  this.set('comment', comment);
  this.render(hbs`{{comment-item comment=comment}}`);

  assert.equal(this.$('.comment-item .comment-body').html(), 'A <b>comment</b>', 'The comment\'s body is rendered');
  assert.equal(this.$('.comment-item .comment-body b').length, 1, 'The comment\'s body is rendered unescaped');
  assert.equal(this.$('.comment-item .username').text().trim(), 'tester');
});

test('it switches between editing and viewing mode', function(assert) {
  assert.expect(3);

  this.container.registry.register('service:session', mockSession);

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

test('mentions are rendered on comment body in read-only mode', function(assert) {
  assert.expect(1);

  this.container.registry.register('service:store', mockStoreReturningMentions);

  this.set('comment', mockCommentWithMentions);

  let expectedOutput = '<p>Mentioning <a href="/user1" class="username">@user1</a> and <a href="/user2" class="username">@user2</a></p>';

  this.render(hbs`{{comment-item comment=comment}}`);
  assert.equal(this.$('.comment-item .comment-body').html(), expectedOutput, 'Mentions are rendered');
});
