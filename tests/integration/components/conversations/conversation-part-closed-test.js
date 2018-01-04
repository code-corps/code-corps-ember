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

test('if current user closes message, "You closed this at" is rendered', function(assert) {
  assert.expect(1);

  let user = {
    id: 1
  };

  set(this, 'author', user);
  set(this, 'closedAt', moment().subtract(2, 'days'));
  stubService(this, 'current-user', { user: { id: 1 } });

  renderPage();

  assert.ok(page.closedAt.text, 'You closed this two days ago', 'The closed at timestamp is rendered');
});
