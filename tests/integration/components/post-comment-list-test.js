import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let mockStore = Ember.Service.extend({
  query () {
    return Ember.RSVP.resolve([]);
  }
});

moduleForComponent('post-comment-list', 'Integration | Component | post comment list', {
  integration: true,
  beforeEach() {
    this.register('service:store', mockStore);
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{post-comment-list}}`);
  assert.equal(this.$('.post-comment-list').length, 1, 'The component\'s element renders');
});

test('It renders a list of comments if there are comments', function(assert) {
  assert.expect(1);

  let comments = [
    Ember.Object.create({ body: "Comment 1" }),
    Ember.Object.create({ body: "Comment 2" }),
    Ember.Object.create({ body: "Comment 3" })
  ];

  this.set('comments', comments);
  this.render(hbs`{{post-comment-list comments=comments}}`);

  assert.equal(this.$('.comment-item').length, 3, 'The correct number of comments is rendered');
});

test('it renders nothing when there are no comments', function(assert) {
  assert.expect(1);
  this.set('comments', []);
  this.render(hbs`{{post-comment-list comments=comments}}`);
  assert.equal(this.$('.comment-item').length, 0, 'No comments are rendered');
});

