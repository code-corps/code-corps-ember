import EmberObject from '@ember/object';
import ConversationRouteMixin from 'code-corps-ember/mixins/conversation-route';
import { module, test } from 'qunit';

module('Unit | Mixin | conversation route');

// Replace this with your real tests.
test('it works', function(assert) {
  let ConversationRouteObject = EmberObject.extend(ConversationRouteMixin);
  let subject = ConversationRouteObject.create();
  assert.ok(subject);
});
