import { moduleFor, test } from 'ember-qunit';
import { set } from '@ember/object';

moduleFor('route:conversations/conversation', 'Unit | Route | conversations/conversation', {
  // Specify the other units that are required for this test.
  needs: [
    'service:can',
    'service:conversation-channel',
    'service:conversations',
    'service:metrics',
    'service:router-scroll',
    'service:scheduler',
    'service:session',
    'service:socket'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it joins correct channel when model is loaded, leaves on transitioning out', function(assert) {
  assert.expect(2);
  let conversation = { id: 'foo' };
  let route = this.subject({ controller: { conversation } });

  set(route, 'conversationChannel.join', (c) => {
    assert.equal(c, conversation, '"join" was called');
  });

  set(route, 'conversationChannel.leave', (c) => {
    assert.equal(c, conversation, '"leave" was called');
  });

  route.afterModel(conversation);
  route.send('willTransition', route);
});
