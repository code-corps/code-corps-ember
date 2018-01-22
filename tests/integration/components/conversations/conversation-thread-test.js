import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import { Ability } from 'ember-can';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-thread';
import { resolve } from 'rsvp';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/conversation-thread
      sortedConversationParts=sortedConversationParts
      conversation=conversation
      send=send
      project=project
    }}
  `);
}

moduleForComponent('conversations/conversation-thread', 'Integration | Component | conversations/conversation thread', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'send', () => {
      return resolve();
    });
    set(this, 'conversation', { });
    set(this, 'sortedConversationParts', []);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders composer', function(assert) {
  assert.expect(1);

  renderPage();
  assert.ok(page.conversationComposer.isVisible, 'Composer is rendered');
});

test('it renders head as conversation part', function(assert) {
  assert.expect(2);

  let message = { body: 'foo', isLoaded: true };
  set(this, 'conversation', { message });

  renderPage();

  assert.equal(page.conversationParts().count, 1, 'A part is rendered for the head.');
  page.conversationParts(0).as((head) => {
    assert.equal(head.body.text, 'foo', 'Message body is rendered.');
  });
});

test('it delays rendering head until loaded', function(assert) {
  assert.expect(1);

  let message = { body: 'foo', isLoaded: false };
  set(this, 'conversation', { message });

  renderPage();

  assert.equal(page.conversationParts().count, 0, 'No part is rendered.');
});

test('it delays rendering conversation parts not yet loaded', function(assert) {
  assert.expect(1);

  let sortedConversationParts = [
    { partType: 'comment', isLoaded: true, body: 'foo 1' },
    { partType: 'comment', isLoaded: false, body: 'foo 2' },
    { partType: 'comment', isLoaded: false, body: 'foo 3' }
  ];

  set(this, 'sortedConversationParts', sortedConversationParts);

  renderPage();

  assert.equal(page.conversationParts().count, 1, 'Only loaded parts are rendered.');
});

test('it delegates send action from composer', function(assert) {
  assert.expect(1);

  set(this, 'send', (body) => {
    assert.equal(body, 'foo', 'Correct value was send with action.');
    return resolve();
  });

  renderPage();

  page.conversationComposer.submittableTextarea.fillIn('foo');
  page.conversationComposer.submitButton.click();
});

test('it shows all parts if user has ability', function(assert) {
  assert.expect(1);
  this.register('ability:project', Ability.extend({ canAdminister: true }));

  let sortedConversationParts = [
    { partType: 'closed', isLoaded: true, body: 'foo 1' },
    { partType: 'reopened', isLoaded: true, body: 'foo 2' },
    { partType: 'comment', isLoaded: true, body: 'foo 3' }
  ];

  set(this, 'sortedConversationParts', sortedConversationParts);

  renderPage();

  assert.equal(page.conversationParts().count, 3, 'all conversation parts are rendered.');
});

test('it shows only comment parts if user has no ability', function(assert) {
  assert.expect(1);
  this.register('ability:project', Ability.extend({ canAdminister: false }));

  let sortedConversationParts = [
    { partType: 'closed', isLoaded: true, body: 'foo 1' },
    { partType: 'reopened', isLoaded: true, body: 'foo 2' },
    { partType: 'comment', isLoaded: true, body: 'foo 3' }
  ];

  set(this, 'sortedConversationParts', sortedConversationParts);

  renderPage();

  assert.equal(page.conversationParts().count, 1, 'only comment parts are rendered.');
});
