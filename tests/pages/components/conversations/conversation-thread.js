import { collection } from 'ember-cli-page-object';
import conversationComposer from 'code-corps-ember/tests/pages/components/conversations/conversation-composer';
import conversationPartComment from 'code-corps-ember/tests/pages/components/conversations/conversation-part-comment';

export default {
  scope: '.conversation-thread',
  conversationComposer,
  conversationParts: collection({
    scope: '.conversation-thread__messages',
    item: conversationPartComment,
    // when a collection scope is specified, itemScope is required
    // in order to correctly detect when there is 0 items
    itemScope: conversationPartComment.scope
  })
};
