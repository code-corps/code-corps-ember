import { create, collection, visitable } from 'ember-cli-page-object';
import conversationThread from 'code-corps-ember/tests/pages/components/conversations/conversation-thread';
import conversationListItem from 'code-corps-ember/tests/pages/components/conversations/conversation-list-item-with-user';
import statusSelect from 'code-corps-ember/tests/pages/components/conversations/status-select';

export default create({
  visit: visitable(':organization/:project/conversations'),

  conversations: collection({
    itemScope: '.conversation-list-item',
    item: conversationListItem
  }),

  conversationThread,

  statusSelect
});
