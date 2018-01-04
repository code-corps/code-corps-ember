import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-thread';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/conversation-thread
      conversation=conversation
      send=onSend
    }}
  `);
}

moduleForComponent('conversations/conversation-thread', 'Integration | Component | conversations/conversation thread', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'onSend', () => {});
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

test('it renders each conversation part', function(assert) {
  assert.expect(4);

  let conversationParts = [
    { isLoaded:true, body: 'foo 1' },
    { isLoaded:true, body: 'foo 2' },
    { isLoaded:true, body: 'foo 3' }
  ];
  set(this, 'conversation', { conversationParts });
  renderPage();

  assert.equal(page.conversationParts().count, 3, 'Each part is rendered.');
  assert.equal(page.conversationParts(0).body.text, 'foo 1', 'Part 1 is rendered correctly.');
  assert.equal(page.conversationParts(1).body.text, 'foo 2', 'Part 2 is rendered correctly.');
  assert.equal(page.conversationParts(2).body.text, 'foo 3', 'Part 3 is rendered correctly.');
});

test('it delays rendering conversation parts not yet loaded', function(assert) {
  assert.expect(1);

  let conversationParts = [
    { isLoaded: true, body: 'foo 1' },
    { isLoaded: false, body: 'foo 2' },
    { isLoaded: false, body: 'foo 3' }
  ];
  set(this, 'conversation', { conversationParts });
  renderPage();

  assert.equal(page.conversationParts().count, 1, 'Only loaded parts are rendered.');
});

test('it delegates send action from composer', function(assert) {
  assert.expect(1);

  set(this, 'onSend', (body) => {
    assert.equal(body, 'foo', 'Correct value was send with action.');
  });

  renderPage();

  page.conversationComposer.submittableTextarea.fillIn('foo');
  page.conversationComposer.submitButton.click();
});
