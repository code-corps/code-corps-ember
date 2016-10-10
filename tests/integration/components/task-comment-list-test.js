import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  RSVP,
  Service
} = Ember;

let mockStore = Service.extend({
  query() {
    return RSVP.resolve([]);
  }
});

moduleForComponent('task-comment-list', 'Integration | Component | task comment list', {
  integration: true,
  beforeEach() {
    this.register('service:store', mockStore);
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
    Object.create({ body: 'Comment 1' }),
    Object.create({ body: 'Comment 2' }),
    Object.create({ body: 'Comment 3' })
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
