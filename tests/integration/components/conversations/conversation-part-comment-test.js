import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-part';
import moment from 'moment';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import {
  assertTooltipContent,
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipVisible
} from 'code-corps-ember/tests/helpers/ember-tooltips';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/conversation-part-comment
      author=author
      body=body
      sentAt=sentAt
    }}
  `);
}

moduleForComponent('conversations/conversation-part-comment', 'Integration | Component | conversations/conversation part comment', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all the details', function(assert) {
  assert.expect(8);

  let body = 'Test body';
  let user = {
    id: 1,
    photoThumbUrl: 'http://lorempixel.com/25/25/',
    username: 'testuser'
  };

  set(this, 'author', user);
  set(this, 'body', body);
  set(this, 'sentAt', moment().subtract(2, 'days'));
  stubService(this, 'current-user', { user: { id: 2 } });

  renderPage();

  assert.equal(page.body.text, body, 'The body renders in the chat bubble');
  assert.equal(page.sentAt.text, '2 days ago', 'The sent at timestamp renders');
  assert.notOk(page.isByCurrentUser, 'Does not have the current user styles');
  assert.equal(page.photo.url, user.photoThumbUrl, 'The user photo renders');
  assertTooltipNotRendered(assert);

  page.photoContainer.mouseenter();

  assertTooltipRendered(assert);
  assertTooltipVisible(assert);
  assertTooltipContent(assert, { contentString: user.username });
});

test('when the message has not been sent yet', function(assert) {
  assert.expect(1);

  set(this, 'sentAt', null);

  renderPage();

  assert.equal(page.sentAt.text, 'Sending...', 'The message says sending');
});

test('when the current user did not send the message', function(assert) {
  assert.expect(1);

  set(this, 'author', { id: 1 });
  stubService(this, 'current-user', { user: { id: 2 } });

  renderPage();

  assert.notOk(page.isByCurrentUser, 'Does not have the current user styles');
});

test('when the current user sent the message', function(assert) {
  assert.expect(1);

  set(this, 'author', { id: 1 });
  stubService(this, 'current-user', { user: { id: 1 } });

  renderPage();

  assert.ok(page.isByCurrentUser, 'Has the current user styles');
});
