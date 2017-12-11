import { create, collection, visitable } from 'ember-cli-page-object';
import conversationThread from 'code-corps-ember/tests/pages/components/conversations/conversation-thread';
import conversationListItem from 'code-corps-ember/tests/pages/components/conversations/conversation-list-item-with-user';

export default create({
  visit: visitable(':organization/:project/conversations'),

  conversations: collection({
    itemScope: '.conversation-list-item',
    item: conversationListItem
  }),

  conversationThread
});
