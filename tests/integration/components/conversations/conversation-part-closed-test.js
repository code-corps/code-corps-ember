import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-part';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import moment from 'moment';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/conversation-part-closed
      author=author
      closedAt=closedAt
    }}
  `);
}

moduleForComponent('conversations/conversation-part-closed', 'Integration | Component | conversations/conversation part closed', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('if current user closes message, "You closed this" is rendered', function(assert) {
  assert.expect(1);

  let user = {
    id: 1,
    username: 'testuser'
  };
  set(this, 'author', user);
  stubService(this, 'current-user', { user });

  let twoMinutesAgo = moment().subtract(2, 'minutes');
  let twoMinutesAgoFriendly = twoMinutesAgo.from();
  set(this, 'closedAt', twoMinutesAgo);

  renderPage();

  let expectedText = `You closed this ${twoMinutesAgoFriendly}`;
  assert.equal(page.closedAt.text, expectedText, 'The closed at timestamp is rendered');
});

test('if someone other than the current user closes the message, "Author.username closed this at" is rendered', function(assert) {
  assert.expect(1);

  let user = {
    id: 1,
    username: 'currentuser'
  };
  stubService(this, 'current-user', { user });

  let author = {
    id: 2,
    username: 'authoruser'
  };
  set(this, 'author', author);

  let twoMinutesAgo = moment().subtract(2, 'minutes');
  let twoMinutesAgoFriendly = twoMinutesAgo.from();
  set(this, 'closedAt', twoMinutesAgo);

  renderPage();

  let expectedText = `${author.username} closed this ${twoMinutesAgoFriendly}`;
  assert.equal(page.closedAt.text, expectedText, 'The closed at timestamp is rendered');
});
