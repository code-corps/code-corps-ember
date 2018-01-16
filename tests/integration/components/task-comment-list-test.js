import RSVP from 'rsvp';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import pageObject from 'ember-cli-page-object';
import taskCommentList from 'code-corps-ember/tests/pages/components/task-comment-list';

let page = pageObject.create(taskCommentList);

function renderPage() {
  page.render(hbs`
  {{task-comment-list comments=comments}}`
  );
}

moduleForComponent('task-comment-list', 'Integration | Component | task comment list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    stubService(this, 'store', {
      query() {
        return RSVP.resolve([]);
      }
    });
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  renderPage();
  assert.ok(page.isVisible, 'The component\'s element renders');
});

test('It renders a list of comments if there are comments', function(assert) {
  assert.expect(1);

  let comments = [
    { body: 'Comment 1' },
    { body: 'Comment 2' },
    { body: 'Comment 3' }
  ];

  this.set('comments', comments);
  renderPage();
  assert.equal(page.comments().count, 3, 'The correct number of comments is rendered');
});

test('it renders nothing when there are no comments', function(assert) {
  assert.expect(1);
  this.set('comments', []);
  renderPage();
  assert.equal(page.comments().count, 0, 'No comments are rendered');
});
