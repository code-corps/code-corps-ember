import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

const {
  RSVP
} = Ember;

moduleForComponent('task-comment-list', 'Integration | Component | task comment list', {
  integration: true,
  beforeEach() {
    stubService(this, 'store', {
      query() {
        return RSVP.resolve([]);
      }
    });
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{task-comment-list}}`);
  assert.equal(this.$('.task-comment-list').length, 1, 'The component\'s element renders');
});

test('It renders a list of comments if there are comments', function(assert) {
  assert.expect(1);

  let comments = [
    { body: 'Comment 1' },
    { body: 'Comment 2' },
    { body: 'Comment 3' }
  ];

  this.set('comments', comments);
  this.render(hbs`{{task-comment-list comments=comments}}`);

  assert.equal(this.$('.comment-item').length, 3, 'The correct number of comments is rendered');
});

test('it renders nothing when there are no comments', function(assert) {
  assert.expect(1);
  this.set('comments', []);
  this.render(hbs`{{task-comment-list comments=comments}}`);
  assert.equal(this.$('.comment-item').length, 0, 'No comments are rendered');
});
