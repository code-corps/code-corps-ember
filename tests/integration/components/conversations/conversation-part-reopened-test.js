import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-part-reopened';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import moment from 'moment';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/conversation-part-reopened
      author=author
      reopenedAt=reopenedAt
    }}
  `);
}

moduleForComponent('conversations/conversation-part-reopened', 'Integration | Component | conversations/conversation part reopened', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('if current user reopens message, "You reopened this" is rendered', function(assert) {
  assert.expect(1);

  let user = {
    id: 1,
    username: 'testuser'
  };
  set(this, 'author', user);
  stubService(this, 'current-user', { user });

  let twoMinutesAgo = moment().subtract(2, 'minutes');
  let twoMinutesAgoFriendly = twoMinutesAgo.from();
  set(this, 'reopenedAt', twoMinutesAgo);

  renderPage();

  let text = `You reopened this ${twoMinutesAgoFriendly}`;
  assert.equal(page.reopenedAt.text, text, 'The reopened at timestamp is rendered');
});

test('if someone other than the current user reopens the message, "Author.username reopened this at" is rendered', function(assert) {
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
  set(this, 'reopenedAt', twoMinutesAgo);

  renderPage();

  let text = `${author.username} reopened this ${twoMinutesAgoFriendly}`;
  assert.equal(page.reopenedAt.text, text, 'The reopened at timestamp is rendered');
});
