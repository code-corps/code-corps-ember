import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-part-closed';
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

  let closedAt = 'MM/DD/YYYY hh:mm:ss';

  set(this, 'author', user);
  set(this, 'closedAt', moment().fromNow());
  stubService(this, 'current-user', { user: { id: 1 } });

  renderPage();
  assert.equal(page.closedAt.text, 'You closed this on', 'The closed at timestamp is rendered');

});

test('if someone other than the current user closes the message, "Author.username closed this at" is rendered', function(assert) {
  assert.expect(1);

  let user = {
    id: 1,
    username: 'currentuser'
  };

  let user1 = {
    id: 2,
    username: 'authoruser'
  };

  set(this, 'author', { user1 });
  set(this, 'closedAt', moment().from());
  stubService(this, 'current-user', { user });

  renderPage();
  assert.equal(page.closedAt.text, 'authoruser closed this on', 'The closed at timestamp is rendered');
});
