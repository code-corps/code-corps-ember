import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let mockMentionFetcher = Ember.Service.extend({
  fetchBodyWithMentions: Ember.RSVP.resolve,
  prefetchBodyWithMentions: Ember.K
});

let mockCurrentUser = Ember.Service.extend({
  user: {
    id: 1
  }
});

let mockStore = Ember.Service.extend({
  query() {
    return Ember.RSVP.resolve([]);
  }
});

let mockPost = Ember.Object.create({
  title: 'A post',
  body: 'A <strong>body</strong>',
  containsCode: true,
  postType: 'issue',
  user: { id: 1 },
  save() {
    return Ember.RSVP.resolve();
  }
});

let mockPostWithMentions = Ember.Object.create({
  title: 'A post with mentions',
  body: '<p>Mentioning @user1 and @user2</p>',
  save() {
    return Ember.RSVP.resolve();
  },
  postUserMentions: [
    Ember.Object.create({ indices: [14, 19], username: 'user1', user: { id: 1 } }),
    Ember.Object.create({ indices: [25, 30], username: 'user2', user: { id: 2 } })
  ]
});

moduleForComponent('post-details', 'Integration | Component | post details', {
  integration: true,
  beforeEach() {
    this.register('service:current-user', mockCurrentUser);
    this.register('service:store', mockStore);
  }
});

test('it renders', function(assert) {

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.render(hbs`{{post-details}}`);

  assert.equal(this.$('.post-details').length, 1, 'The component\'s element is rendered');
});


test('it renders all the ui elements properly bound', function(assert) {
  this.set('post', mockPost);

  let mockMentionFetcher = Ember.Service.extend({
    prefetchBodyWithMentions() {
      return 'A body';
    }
  });

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.render(hbs`{{post-details post=post}}`);

  assert.equal(this.$('.post-details .comment-body').text().trim(), 'A body', 'Body is correctly bound and rendered');
  assert.equal(this.$('.post-details .code-theme-selector').length, 1);
});

test('the post body is rendered as unescaped html', function (assert) {
  let mockMentionFetcher = Ember.Service.extend({
    prefetchBodyWithMentions() {
      return 'A body with a <strong>strong element</strong>';
    }
  });

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.set('post', mockPost);

  this.render(hbs`{{post-details post=post}}`);
  assert.equal(this.$('.post-details .comment-body strong').length, 1, 'A html element within the body element is rendered unescaped');
});

test('user can switch between view and edit mode for post body', function(assert) {
  assert.expect(3);
  this.set('post', mockPost);

  this.register('service:mention-fetcher', mockMentionFetcher);

  this.render(hbs`{{post-details post=post}}`);
  assert.equal(this.$('.post-body .edit').length, 1, 'The edit button is rendered');

  this.$('.post-body .edit').click();
  assert.equal(this.$('.post-body .cancel').length, 1, 'The cancel button is rendered');

  this.$('.post-body .cancel').click();
  assert.equal(this.$('.post-body .edit').length, 1, 'The edit button is rendered');
});

test('mentions are rendered on post body in read-only mode', function(assert) {
  assert.expect(1);

  this.set('post', mockPostWithMentions);

  let expectedOutput = '<p>Mentioning <a href="/user1" class="username">@user1</a> and <a href="/user2" class="username">@user2</a></p>';

  this.render(hbs`{{post-details post=post}}`);
  assert.equal(this.$('.post-body .comment-body').html(), expectedOutput, 'Mentions are rendered');
});
