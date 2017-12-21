import {
  collection,
  create,
  visitable
} from 'ember-cli-page-object';
import conversationThread from 'code-corps-ember/tests/pages/components/conversations/conversation-thread';
import conversationListItemWithProject from 'code-corps-ember/tests/pages/components/conversations/conversation-list-item-with-project';

export default create({
  visit: visitable('/conversations'),

  conversations: collection({
    itemScope: '.conversation-list-item',
    item: conversationListItemWithProject
  }),

  conversationThread
});
