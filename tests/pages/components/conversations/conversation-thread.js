import { collection } from 'ember-cli-page-object';
import conversationComposer from 'code-corps-ember/tests/pages/components/conversations/conversation-composer';
import conversationPart from 'code-corps-ember/tests/pages/components/conversations/conversation-part';

export default {
  scope: '.conversation-thread',
  conversationComposer,
  conversationParts: collection({
    scope: '.conversation-thread__messages',
    item: conversationPart,
    // when a collection scope is specified, itemScope is required
    // in order to correctly detect when there is 0 items
    itemScope: conversationPart.scope
  })
};
