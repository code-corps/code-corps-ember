import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import commentItemComponent from 'code-corps-ember/tests/pages/components/comment-item';

let page = PageObject.create(commentItemComponent);

const {
  Object,
  RSVP,
  run,
  set,
  setProperties
} = Ember;

function renderPage() {
  page.render(hbs`{{comment-item comment=comment}}`);
}

moduleForComponent('comment-item', 'Integration | Component | comment item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all required comment elements properly', function(assert) {
  assert.expect(6);

  let comment = Object.create({
    isLoaded: false
  });

  set(this, 'comment', comment);

  renderPage();

  assert.equal(page.commentBody.text, '', 'The body is not initially rendered, since the comment has not loaded');
  assert.equal(page.username, '', 'The username of the comment author is not rendered, since the comment is not loaded yet');
  assert.notOk(page.codeThemeSelectorVisible, 'The code theme selector is hidden, since the comment is not loaded yet.');

  // this will trigger some promise resolving, so we wrap it in a loop
  run(this, () => {
    setProperties(comment, {
      body: 'A <b>comment</b>',
      containsCode: true,
      isLoaded: true,
      user: { username: 'tester' }
    });
  });

  assert.equal(page.commentBody.text, 'A comment', 'The body is now rendered.');
  assert.equal(page.username, 'tester', 'The username of the comment author is now rendered.');
  assert.ok(page.codeThemeSelectorVisible, 'The code theme selector is visible, since the comment is marked as containing code.');
});

test('it switches between editing and viewing mode', function(assert) {
  assert.expect(3);

  let user = Object.create({ id: 1 });
  stubService(this, 'current-user', { user });

  let comment = {
    user,
    save() {
      return RSVP.resolve();
    },
    rollbackAttributes() {}
  };

  set(this, 'comment', comment);
  renderPage();

  page.clickEdit();

  assert.ok(page.editor.isVisible, 'Component switched the UI to editing mode.');

  page.clickCancel();

  assert.notOk(page.editor.isVisible, 'Component switched back the UI to view mode on cancel.');

  page.clickEdit();

  // there will be some promise resolving, so we need a run loop
  run(this, () => {
    page.clickSave();
  });

  assert.notOk(page.editor.isVisible, 'Component switched back to view mode.');
});

