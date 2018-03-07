import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-thread';
import { resolve } from 'rsvp';

let page = PageObject.create(component);

moduleForComponent('conversations/conversation-thread', 'Integration | Component | conversations/conversation thread', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'send', () => {
      return resolve();
    });
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders composer', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{conversations/conversation-thread
      sortedConversationParts=conversation.sortedConversationParts
      conversation=conversation
      send=send
    }}
  `);

  assert.ok(page.conversationComposer.isVisible, 'Composer is rendered');
});

test('it renders head as conversation part', function(assert) {
  assert.expect(2);

  let message = { body: 'foo', isLoaded: true };
  set(this, 'conversation', { message });

  this.render(hbs`
    {{conversations/conversation-thread
      sortedConversationParts=conversation.sortedConversationParts
      conversation=conversation
      send=send
    }}
  `);

  assert.equal(page.conversationParts.length, 1, 'A part is rendered for the head.');
  page.conversationParts.objectAt(0).as((head) => {
    assert.equal(head.body.text, 'foo', 'Message body is rendered.');
  });
});

test('it delays rendering head until loaded', function(assert) {
  assert.expect(1);

  let message = { body: 'foo', isLoaded: false };
  set(this, 'conversation', { message });

  this.render(hbs`
    {{conversations/conversation-thread
      sortedConversationParts=conversation.sortedConversationParts
      conversation=conversation
      send=send
    }}
  `);

  assert.equal(page.conversationParts.length, 0, 'No part is rendered.');
});

test('it renders each conversation part', function(assert) {
  assert.expect(4);

  let sortedConversationParts = [
    { isLoaded: true, body: 'foo 1', insertedAt: new Date('2017-11-01') },
    { isLoaded: true, body: 'foo 2', insertedAt: new Date('2017-12-01') },
    { isLoaded: true, body: 'foo 3', insertedAt: new Date('2017-10-01') }
  ];
  set(this, 'conversation', { sortedConversationParts });

  this.render(hbs`
    {{conversations/conversation-thread
      sortedConversationParts=conversation.sortedConversationParts
      conversation=conversation
      send=send
    }}
  `);

  assert.equal(page.conversationParts.length, 3, 'Each part is rendered.');
  assert.equal(page.conversationParts.objectAt(0).body.text, 'foo 1', 'Part 1 is rendered first');
  assert.equal(page.conversationParts.objectAt(1).body.text, 'foo 2', 'Part 2 is rendered second');
  assert.equal(page.conversationParts.objectAt(2).body.text, 'foo 3', 'Part 3 is rendered last');
});

test('it delays rendering conversation parts not yet loaded', function(assert) {
  assert.expect(1);

  let sortedConversationParts = [
    { isLoaded: true, body: 'foo 1' },
    { isLoaded: false, body: 'foo 2' },
    { isLoaded: false, body: 'foo 3' }
  ];
  set(this, 'conversation', { sortedConversationParts });

  this.render(hbs`
    {{conversations/conversation-thread
      sortedConversationParts=conversation.sortedConversationParts
      conversation=conversation
      send=send
    }}
  `);

  assert.equal(page.conversationParts.length, 1, 'Only loaded parts are rendered.');
});

test('it delegates send action from composer', function(assert) {
  assert.expect(1);

  set(this, 'send', (body) => {
    assert.equal(body, 'foo', 'Correct value was send with action.');
    return resolve();
  });

  this.render(hbs`
    {{conversations/conversation-thread
      sortedConversationParts=conversation.sortedConversationParts
      conversation=conversation
      send=send
    }}
  `);

  page.conversationComposer.submittableTextarea.fillIn('foo');
  page.conversationComposer.submitButton.click();
});
